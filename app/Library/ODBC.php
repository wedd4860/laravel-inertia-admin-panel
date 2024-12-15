<?php

namespace App\Library;

use Illuminate\Support\Str;

class ODBC
{
    public $insODBCConn; // PDO 인스턴스 변수
    private $strDbHost = ''; // DB접속 호스트
    private $strDbPort = ''; // DB접속 포트
    private $strDbName = ''; // DB Name
    private $strDbUser = ''; // DB접속 계정
    private $strDbPass = ''; // DB접속 비번
    private $strDbType = ''; // DB 타입, odbc
    private $strDbDriver = '';
    private $isReturn = 'N'; // [사용X] Y, N : mssql 타입의 리턴값이 있을때

    private $chkDebugMode = ''; // 'on' or null (on일 경우, 실행쿼리 보여줌)
    private $statement; // [사용X] prepare 시 쿼리문 컨트롤 인스턴스
    private $strPrepareQry = ''; // [사용X] prepare -> execute 하는 경우 사용할 쿼리문 저장

    private $bound_variables = [];
    private $strFetch = 'fetchAll';

    public function __construct($arrDbInfo = null, $strDbName = null)
    {
        if ($arrDbInfo && $strDbName) {
            $this->setDbConnect($arrDbInfo, $strDbName);
        }
    }

    /**
     * DB 접속정보 넘겨받아서 접속실행 후 접속 인스턴스 리턴
     *
     * @param [array] $arrDbInfo : DB접속 정보(global_var 배열변수 넘겨받음)
     * @param [string] $strDbName : 접속할 DB명
     * @return [instance] $this->insPdoConn : 커넥션 인스턴스
     */
    public function setDbConnect($arrDbInfo, $strDbName)
    {
        $this->setOdbcDbInfo($arrDbInfo);
        $this->insODBCConn = $this->setOdbcConnect($strDbName);
        return $this->insODBCConn;
    }

    /**
     * DB 접속정보 배열을 받아서 접속정보 변수로 세팅
     *
     * @param [array] $arrDbInfo : global_var에서 사용하는 배열변수 그대로 사용
     * @return void
     */
    public function setOdbcDbInfo($arrDbInfo)
    {
        $this->strDbDriver = $arrDbInfo['driver'] ?? 'MySQL ODBC 3.51 Driver';
        $this->strDbHost = $arrDbInfo['host'];
        $this->strDbPort = $arrDbInfo['port'] ?? '';
        $this->strDbUser = $arrDbInfo['userid'];
        $this->strDbPass = $arrDbInfo['passwd'];
        $this->strDbType = 'odbc';
    }

    public function setOdbcConnect($strDbName)
    {
        $strConnInfoTxt = 'DRIVER={' . $this->strDbDriver . '};Server=' . $this->strDbHost . ';Database=' . $strDbName;
        $insOdbcConn = odbc_connect($strConnInfoTxt, $this->strDbUser, $this->strDbPass);
        if (!$insOdbcConn) {
            // 에러메시지는 디버깅할 때만 봐야함
            if ($this->chkDebugMode == 'on') {
                echo $this->getMessageError() . '<br /><br />';
            }
        }
        return $insOdbcConn;
    }

    public function getMessageError()
    {
        return odbc_error($this->insODBCConn) . '<br />' . odbc_errormsg($this->insODBCConn);
    }

    /**
     * 쿼리 디버그 모드 설정
     *
     * @param [string] $strChk : 'on' or null
     * @return void
     */
    public function setDebugQuery($strChk)
    {
        $this->chkDebugMode = ($strChk == 'on') ? 'on' : '';
    }

    public function set_strFetch($val = null)
    {
        if ($val == 'fetch' || $val == 'fetchAll' || $val == 'sql') {
            $this->strFetch = $val;
        } else {
            $this->strFetch = '';
        }
    }

    /**
     * prepare() -> execute() 하는 경우, 쿼리문 정의해 두는 함수
     *
     * @param [string] $strPrepareQuery : 실행준비할 쿼리문 (치환값은 :COLUMN 으로 사용하도록 권장함)
     * @return void
     */
    public function prepare($strPrepareQuery)
    {
        $this->set_strFetch();
        $this->strPrepareQry = $strPrepareQuery; // execute()에서 출력할 쿼리문 저장해 둠
        $this->statement = odbc_prepare($this->insODBCConn, $strPrepareQuery);
    }

    /**
     * prepare() 사용 후, 실제 쿼리 실행하는 함수
     * $arrValues에는 미리 선언해 놓은 쿼리문 치환값들과 개수가 맞게 정의되어 있어야 함
     *
     * @param [array] $arrValues : prepare 쿼리문의 치환값들과 치환할 값들의 배열
     * @return [array] $arrRtnRow : 쿼리결과값(배열)
     */
    public function execute()
    {
        // prepare -> execute 하는 경우에는 배열값을 치환해서 보여줌
        if ($this->chkDebugMode == 'on') {
            $msc = microtime(true);
            $strShowQuery = $this->getQueryString();
            echo $strShowQuery . '<br />';
        }
        // Route::$queryLog[] = $this->getQueryString();
        $arrRtnRow = [];
        $res = null;
        $res = odbc_execute($this->statement, $this->bound_variables);
        if ($res) {
            if ($this->strFetch == 'fetchAll') {
                while ($row = odbc_fetch_array($this->statement)) {
                    $arrRtnRow[] = $row;
                }
            } elseif ($this->strFetch == 'fetch' || $this->strFetch == 'sql' ) {
                $arrRtnRow = odbc_fetch_array($this->statement);
            }
        }
        $this->closeStmt();
        if ($this->chkDebugMode == 'on') {
            $msc = microtime(true) - $msc;
            echo 'Execute Time : ' . $msc . 's<br /><br />';
        }
        return $arrRtnRow;
    }

    public function getQueryString()
    {
        $prepareQry = $this->strPrepareQry;
        $variables = array_map(function ($v) {
            return "'$v'";
        }, $this->bound_variables);
        $queryString = Str::replaceArray('?', $variables, $prepareQry);
        return $queryString;
    }

    /**
     * ODBC 커넥션 끊기
     * ODBC 인스턴스 변수와 prepare시에 사용하는 $statement 변수 초기화
     *
     * @return void
     */
    public function closeOdbc()
    {
        $this->closeStmt();
        odbc_close($this->insODBCConn);
    }

    public function close()
    {
        $this->closeOdbc();
    }

    /**
     * PDO prepare시에 사용하는 $statement 변수 초기화
     *
     * @return void
     */
    public function closeStmt()
    {
        $this->statement = null;
    }

    /**
     * bind function
     *
     * @param [mixed] $value : bind 값
     * @return void
     */
    public function bind($value)
    {
        if (is_array($value)) {
            $this->bound_variables = $value;
        } else {
            $this->bound_variables = [];
        }
    }

    public function __destruct()
    {
    }
}
