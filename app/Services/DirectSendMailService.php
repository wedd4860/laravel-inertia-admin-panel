<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class DirectSendMailService
{
    private $apiKey;
    private $apiUrl;
    private $apiUsername;
    private $apiReturnUrl;
    private $apiFooterSort;

    public function __construct($footerSort = 'LEFT')
    {
        $this->apiKey = env('DIRECTSEND_API_KEY');
        $this->apiUrl = env('DIRECTSEND_API_URL');
        $this->apiUsername = env('DIRECTSEND_API_USERNAME');
        $this->apiReturnUrl = env('DIRECTSEND_API_RETURN_URL');
        $this->apiFooterSort = $footerSort;
    }

    public function sendMail(array $params): array
    {
        $validator = Validator::make($params, [
            'toName' => 'required',
            'toMail' => 'required|email',
            'fromName' => 'required',
            'fromMail' => 'required|email',
            'subject' => 'required',
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return ['RETURN' => 'ERR'];
        }
        $aValidated = $validator->validated();
        $toName = $aValidated['toName'];
        $toEmail = $aValidated['toMail'];
        $fromName = $aValidated['fromName'];
        $fromEmail = $aValidated['fromMail'];
        $subject = $aValidated['subject'];
        $message = $aValidated['content'];
        $receiver = '{"name":"' . $toName . '", "email":"' . $toEmail . '", "mobile":"", "note1":"", "note2":"", "note3":"", "note4":"", "note5":""}';
        $receiver = '[' . $receiver . ']'; // JSON 데이터
        $message = urlencode($message);

        $response = Http::withHeaders([
            "Cache-Control" => "no-cache",
            "Content-Type" => "application/json; charset=utf-8"
        ])->withOptions([
            'verify' => false, // SSL 인증서 검증 무시
            'connect_timeout' => 3, // 연결 시간 초과 설정
            'timeout' => 0 // 응답 시간 초과를 무제한으로 설정
        ])->post($this->apiUrl, [
            'subject' => $subject,
            'body' => $message,
            'sender' => $fromEmail,
            'sender_name' => $fromName,
            'username' => $this->apiUsername,
            'receiver' => $receiver,
            'return_url_yn' => true,
            'return_url' => $this->apiReturnUrl,
            'footer_sort' => $this->apiFooterSort,
            'key' => $this->apiKey
        ]);
        $status_code = $response->status();
        if ($status_code != 200) {
            return ['RETURN' => 'ERR'];
        }
        return ['RETURN' => 'SUC'];
    }

    /**
     * protected $directSendMailService;
    * public function __construct(MemberRepository $memberRepository, DirectSendMailService $directSendMailService)
    * {
    *     $this->memberRepository = $memberRepository;
    *     $this->directSendMailService = $directSendMailService;
    * }
    * $aMailInfo = [
    *     'toName' => 'ijkim@masangsoft.com', // 받는사람
    *     'toMail' => 'ijkim@masangsoft.com', // 받는사람이메일
    *     'fromName' => 'masangsoft', // 보낸사람
    *     'fromMail' => 'noreply@masangsoft.com', // 받는사람이메일
    *     'subject' => 'masangsoft :: Email Verification Code Notification', // 제목
    *     'content' => View::make('email.code', ['code' => 'test'])->render(), //메일내용
    * ];
    * $result = $this->directSendMailService->sendMail($aMailInfo);
     */
}
