<?php

namespace App\Services;

use App\Http\Resources\KR\CS\CommonArrayResource;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

class BPService
{
    protected $postUrl;
    protected $getUrl;
    protected $headers;
    protected $key;
    protected $company;
    protected $path;
    protected $method;
    protected $params;

    public function __construct()
    {
        $this->headers = [
            'Accept' => 'text/xml,application/xml,application/xhtml+xml,text/html,text/plain,image/png,image/jpeg,image/gif,*/*',
            'Accept-Encoding' => 'gzip',
            'Accept-Language' => 'UTF-8',
        ];
        $this->postUrl = env('BP_API_POST_URL');
        $this->getUrl = env('BP_API_GET_URL');
        $this->key = env('BP_API_KEY');
        $this->company = env('BP_API_COMPANY');
    }

    private function setParams(array $params, string $type)
    {
        if (!Arr::get($params, 'member_srl')) {
            throw new \Exception('잘못된 접근입니다.');
        }
        if (in_array($type, ['usage', 'gift'])) {
            $this->params = [
                'noPage' => Arr::get($params, 'page', 1),
                'noPageRow' => Arr::get($params, 'limit', 20),
                'cdCompany' => $this->company,
                'noUser' => Arr::get($params, 'member_srl'),
                'dateStart' => '20120801',
                'dateEnd' => Carbon::now()->format('Ymd'),
            ];
            $this->params['param_enc'] = md5($this->params['noPage'] . $this->params['noPageRow'] . $this->params['cdCompany'] . $this->params['noUser'] . $this->params['dateStart'] . $this->params['dateEnd'] . $this->key);
        } elseif ($type == 'recharge') {
            $this->params = [
                'noPage' => Arr::get($params, 'page', 1),
                'noPageRow' => Arr::get($params, 'limit', 20),
                'cdCompany' => $this->company,
                'noUser' => Arr::get($params, 'member_srl'),
                'noContents' => '',
                'cdBillMethod' => 'N',
                'dateStart' => '20120801',
                'dateEnd' => Carbon::now()->format('Ymd'),
            ];
        } elseif ($type == 'balance') {
            $this->params = [
                'cdCompany' => $this->company,
                'noUser' => Arr::get($params, 'member_srl'),
                'idUser' => Arr::get($params, 'user_id'),
            ];
            $this->params['param_enc'] = md5($this->params['cdCompany'] . $this->params['noUser'] . $this->params['idUser'] . $this->key);
        } elseif ($type == 'balanceSingle') {
            $this->params = [
                'cdCompany' => $this->company,
                'noUser' => Arr::get($params, 'member_srl'),
                'idUser' => Arr::get($params, 'user_id'),
                'noContents' => Arr::get($params, 'product'),
            ];
            $this->params['param_enc'] = md5($this->params['cdCompany'] . $this->params['noUser'] . $this->params['idUser'] . $this->params['noContents'] . $this->key);
        } else {
            throw new \Exception('잘못된 접근입니다.');
        }
    }

    private function sendRequest()
    {
        if ($this->path == '' || count($this->params) === 0) {
            throw new \Exception('잘못된 접근입니다.');
        }
        if ($this->method == 'POST') {
            $response = Http::withHeaders($this->headers)->asForm()->post($this->postUrl . $this->path, $this->params);
        } elseif ($this->method == 'GET') {
            $response = Http::get($this->getUrl . $this->path, http_build_query($this->params));
        }
        if ($response->successful()) {
            return json_decode($response->body(), true);
        } else {
            throw new \Exception('잘못된 접근입니다.');
        }
    }

    public function getBalance(array $params)
    {
        $this->method = 'POST';
        $this->setParams($params, 'balance');
        $this->path = '/BGIFT/CashBalanceInfo.asp';
        return $this->sendRequest();
    }

    public function getBalanceSingle(array $params)
    {
        $this->method = 'POST';
        $this->setParams($params, 'balanceSingle');
        $this->path = '/BGIFT/CashBalanceInfo2.asp';
        return $this->sendRequest();
    }

    public function getUsage(array $params)
    {
        $this->method = 'POST';
        $this->setParams($params, 'usage');
        $this->path = '/getPurchaseCashList.asp';
        return $this->sendRequest();
    }

    public function getRecharge(array $params)
    {
        $this->method = 'GET';
        $this->setParams($params, 'recharge');
        $this->path = '/json/getPaymentList.asp';
        return $this->sendRequest();
    }

    public function getResource(array $items, string $type, int $page = 1, int $perPage = 20, $request)
    {
        $result = [];
        if ($type == 'default') {
            $result = new CommonArrayResource(collect($items)->values()->all());
        } elseif ($type == 'page') {
            $collect = collect($items['masang']['RET_ROWS'] ?? []); // 전체 데이터 수
            $totalRow = Arr::get($items, 'masang.RET_ROWS.0.TotalRow') ?? 0; // 전체 로우수
            $paginate = new LengthAwarePaginator(
                $collect,
                $totalRow,
                $perPage,
                $page,
                [
                    'path' => $request->url(),
                    'query' => $request->query(),
                ]
            );
            $paginate->onEachSide(1)->appends($request->query());
            $result = CommonArrayResource::collection($paginate);
        } else {
            throw new \Exception('잘못된 접근입니다.');
        }
        return $result;
    }

    public function getGift(array $params)
    {
        $this->method = 'POST';
        $this->setParams($params, 'gift');
        $this->path = '/getGiftItemList.asp';
        return $this->sendRequest();
    }
}
