<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExcelExportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KR\CS;
use App\Http\Controllers\KR\GZ;
use App\Http\Controllers\KR\NX;
use App\Http\Controllers\KR\LH;
use App\Http\Controllers\KR\FH;
use App\Http\Controllers\KR\ST;
use App\Http\Controllers\KR\MSPC;

Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->middleware('guest');

Route::middleware('auth')->group(function () {
    // start : 내부 api 라우트
    Route::prefix('app-api')->group(function () {
        Route::prefix('/kr/st')->group(function () {
            Route::get('/inquiry', [ST\InquiryController::class, 'index'])->name('api.kr.st.inquiry');
        });
    });
    // end : 내부 api 라우트

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // kr/cs 국내 CS_ADMIN
    Route::prefix('/kr/cs')->middleware(['permission:cs'])->group(function () {
        Route::prefix('/member')->group(function () {
            // 마상계정
            Route::get('/info', [CS\MemberInfoController::class, 'index'])->name('kr.cs.member.info.index');
            Route::get('/{member}/info/edit', [CS\MemberInfoController::class, 'edit'])->name('kr.cs.member.info.edit');
            Route::put('/{member}/info', [CS\MemberInfoController::class, 'update'])->name('kr.cs.member.info.update');

            // 탈퇴처리
            Route::put('/{memberSrl}/leave', [CS\MemberInfoController::class, 'leave'])->name('kr.cs.member.info.leave');

            // 휴먼계정
            Route::get('/expired', [CS\MemberExpiredController::class, 'index'])->name('kr.cs.member.expired.index');
            Route::get('/{member}/expired/edit', [CS\MemberExpiredController::class, 'edit'])->name('kr.cs.member.expired.edit');
            Route::put('/{member}/expired', [CS\MemberExpiredController::class, 'update'])->name('kr.cs.member.expired.update');

            // 복구계정
            Route::get('/restore', [CS\MemberRestoreController::class, 'index'])->name('kr.cs.member.restore.index');
            Route::put('/{memberSrl}/restore', [CS\MemberRestoreController::class, 'restore'])->name('kr.cs.member.restore.restore');

            // 테스트 계정
            Route::get('/test-info', [CS\TestInfoController::class, 'index'])->name('kr.cs.member.test.index');
            Route::get('/test-info/create', [CS\TestInfoController::class, 'create'])->name('kr.cs.member.test.create');
            Route::post('/test-info', [CS\TestInfoController::class, 'store'])->name('kr.cs.member.test.store');
            Route::delete('{testId}/test-info', [CS\TestInfoController::class, 'destroy'])->name('kr.cs.member.test.destroy')
                ->where('testId', '[a-zA-Z0-9\-_]+');
            Route::get('/{testId}/test-info/edit', [CS\TestInfoController::class, 'edit'])->name('kr.cs.member.test.edit')
                ->where('testId', '[a-zA-Z0-9\-_]+');
            Route::put('/{testId}/test-info', [CS\TestInfoController::class, 'update'])->name('kr.cs.member.test.update')
                ->where('testId', '[a-zA-Z0-9\-_]+');
        });

        Route::prefix('/mcoin')->group(function () {
            // M코인조회 마상계정
            Route::get('/masang', [CS\McoinMasangController::class, 'index'])->name('kr.cs.mcoin.masang.index');
            Route::get('/{member}/masang/{history}', [CS\McoinMasangHistoryController::class, 'show'])->name('kr.cs.mcoin.masang.history.show')
                ->where(['history' => '^(balance|usage|recharge|gift)$']);
        });

        Route::prefix('/security')->group(function () {
            // 전화/OTP/해외IP차단
            Route::get('/service', [CS\SecurityServiceController::class, 'index'])->name('kr.cs.security.service.index');
            Route::delete('{memberSrl}/{type}/service', [CS\SecurityServiceController::class, 'destroy'])->name('kr.cs.security.service.destroy')
                ->where(['id' => '[0-9]+', 'type' => '^(otp|ip|phone)$']);

            // 지정 PC
            Route::get('/pc', [CS\SecurityPCRegisterController::class, 'index'])->name('kr.cs.security.pc.index');
            Route::delete('{memberSrl}/{pcname}/pc', [CS\SecurityPCRegisterController::class, 'destroy'])->name('kr.cs.security.pc.destroy')
                ->whereNumber('memberSrl');
        });

        Route::prefix('/log')->group(function () {
            // 로그인 로그
            Route::get('/login', [CS\LogLoginController::class, 'index'])->name('kr.cs.log.login.index');

            // 본인인증 로그
            Route::get('/authentication', [CS\LogAuthenticationController::class, 'index'])->name('kr.cs.log.authentication.index');
        });

        Route::prefix('/block')->group(function () {
            // 해외IP차단 ON/OFF
            Route::get('/cs/abroad', [CS\BlockAbroadController::class, 'show'])->name('kr.cs.block.abroad.show');
            Route::patch('/cs/abroad', [CS\BlockAbroadController::class, 'update'])->name('kr.cs.block.abroad.update');

            // IP차단
            Route::get('/ip', [CS\BlockIpController::class, 'index'])->name('kr.cs.block.ip.index');
            Route::post('/ip', [CS\BlockIpController::class, 'store'])->name('kr.cs.block.ip.store');
            Route::delete('/ip/{ipaddress}', [CS\BlockIpController::class, 'destroy'])->name('kr.cs.block.ip.destroy')
                ->where('ipaddress', '(?:\d{1,3}\.){3}\d{1,3}');
            Route::get('/ip/create', [CS\BlockIpController::class, 'create'])->name('kr.cs.block.ip.create');

            // 해킹계정차단
            Route::get('/hacked', [CS\BlockHackedController::class, 'index'])->name('kr.cs.block.hacked.index');
            Route::post('/hacked', [CS\BlockHackedController::class, 'store'])->name('kr.cs.block.hacked.store');
            Route::delete('/{memberSrl}/hacked', [CS\BlockHackedController::class, 'destroy'])->name('kr.cs.block.hacked.destroy')
                ->whereNumber('memberSrl');
            Route::get('/hacked/create', [CS\BlockHackedController::class, 'create'])->name('kr.cs.block.hacked.create');
            Route::get('/{memberSrl}/hacked/edit', [CS\BlockHackedController::class, 'edit'])->name('kr.cs.block.hacked.edit')
                ->whereNumber('memberSrl');
            Route::patch('/{memberSrl}/hacked', [CS\BlockHackedController::class, 'update'])->name('kr.cs.block.hacked.update')
                ->whereNumber('memberSrl');

            // 전화번호차단
            Route::get('/phone', [CS\BlockPhoneController::class, 'index'])->name('kr.cs.block.phone.index');
            Route::post('/phone', [CS\BlockPhoneController::class, 'store'])->name('kr.cs.block.phone.store');
            Route::delete('/{seq}/phone', [CS\BlockPhoneController::class, 'destroy'])->name('kr.cs.block.phone.destroy')
                ->whereNumber('seq');
            Route::get('/phone/create', [CS\BlockPhoneController::class, 'create'])->name('kr.cs.block.phone.create');
        });

        Route::prefix('/link')->group(function () {
            // 마상소프트 런처 url 관리
            Route::get('/launcher', [CS\LinkLauncherController::class, 'index'])->name('kr.cs.link.launcher.index');
            Route::post('/launcher', [CS\LinkLauncherController::class, 'store'])->name('kr.cs.link.launcher.store');
            Route::delete('/{launcherSeq}/launcher', [CS\LinkLauncherController::class, 'destroy'])->name('kr.cs.link.launcher.destroy')
                ->whereNumber('launcherSeq');
            Route::get('/launcher/create', [CS\LinkLauncherController::class, 'create'])->name('kr.cs.link.launcher.create');
            Route::get('/{launcherSeq}/launcher/edit', [CS\LinkLauncherController::class, 'edit'])->name('kr.cs.link.launcher.edit')
                ->whereNumber('launcherSeq');
            Route::patch('/{launcherSeq}/launcher', [CS\LinkLauncherController::class, 'update'])->name('kr.cs.link.launcher.update')
                ->whereNumber('launcherSeq');
        });

        Route::prefix('/banner')->group(function () {
            // 배너/슬라이드 관리
            Route::get('/main', [CS\BannerMainController::class, 'index'])->name('kr.cs.banner.main.index');
            Route::get('/main/create', [CS\BannerMainController::class, 'create'])->name('kr.cs.banner.main.create');
            Route::post('/main', [CS\BannerMainController::class, 'store'])->name('kr.cs.banner.main.store');
            Route::delete('/{bannerId}/main', [CS\BannerMainController::class, 'destroy'])->name('kr.cs.banner.main.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/main/edit', [CS\BannerMainController::class, 'edit'])->name('kr.cs.banner.main.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/main', [CS\BannerMainController::class, 'update'])->name('kr.cs.banner.main.update')
                ->whereNumber('bannerId');
        });

        Route::prefix('/permission')->group(function () {
            // 관리자 권한
            Route::get('/prime', [CS\PermissionPrimeController::class, 'index'])->name('kr.cs.permission.prime.index');
            Route::post('/prime', [CS\PermissionPrimeController::class, 'store'])->name('kr.cs.permission.prime.store');
            Route::get('/prime/create', [CS\PermissionPrimeController::class, 'create'])->name('kr.cs.permission.prime.create');
            Route::delete('/{memberSrl}/prime', [CS\PermissionPrimeController::class, 'destroy'])->name('kr.cs.permission.prime.destroy')
                ->whereNumber('memberSrl');
            Route::get('/{memberSrl}/prime/edit', [CS\PermissionPrimeController::class, 'edit'])->name('kr.cs.permission.prime.edit')
                ->whereNumber('memberSrl');
            Route::patch('/{memberSrl}/info', [CS\PermissionPrimeController::class, 'update'])->name('kr.cs.permission.prime.update')
                ->whereNumber('memberSrl');
        });

        Route::prefix('/board')->group(function () {
            // 게시글조회
            Route::get('/document', [CS\BoardDocumentController::class, 'index'])->name('kr.cs.board.document.index');
            // 댓글조회
            Route::get('/comment', [CS\BoardCommentController::class, 'index'])->name('kr.cs.board.comment.index');
        });

        Route::prefix('/coupon')->group(function () {
            // 쿠폰 관리
            Route::get('/event', [CS\CouponEventController::class, 'index'])->name('kr.cs.coupon.event.index');
            Route::get('/event/create', [CS\CouponEventController::class, 'create'])->name('kr.cs.coupon.event.create');
            Route::post('/event', [CS\CouponEventController::class, 'store'])->name('kr.cs.coupon.event.store');
            Route::get('/{couponEventId}/event/read', [CS\CouponEventController::class, 'show'])->name('kr.cs.coupon.event.read')
                ->whereNumber('couponEventId');
            Route::patch('/{couponEventId}/event/{status}', [CS\CouponEventController::class, 'update'])->name('kr.cs.coupon.event.update')
                ->whereNumber('couponEventId')->where('status', '(0|1)');
            Route::delete('/{couponEventId}/event', [CS\CouponEventController::class, 'destroy'])->name('kr.cs.coupon.event.destroy')
                ->whereNumber('couponEventId');

            Route::get('/{couponEventId}/number/create', [CS\CouponController::class, 'create'])->name('kr.cs.coupon.number.create')
                ->whereNumber('couponEventId');
            Route::post('/number', [CS\CouponController::class, 'store'])->name('kr.cs.coupon.number.store');
            Route::get('/{couponEventId}/number/{couponNumber}/read', [CS\CouponController::class, 'show'])->name('kr.cs.coupon.number.read')
                ->whereNumber('couponEventId')->where('couponNumber', '([A-Z0-9]{4}-){3}[A-Z0-9]{4}');
            Route::get('/{couponEventId}/number/{couponNumber}/download', [CS\CouponController::class, 'downloadCouponUsed'])->name('kr.cs.coupon.download.used')
                ->whereNumber('couponEventId')->where('couponNumber', '([A-Z0-9]{4}-){3}[A-Z0-9]{4}');

            Route::get('/number', [CS\CouponController::class, 'index'])->name('kr.cs.coupon.number.index');
        });
    });

    // kr/mspc : 파트너크리에이터
    Route::prefix('/kr/mspc')->middleware(['permission:mspc'])->group(function () {
        Route::prefix('/creators')->group(function () {
            // 그룹
            Route::get('/group', [MSPC\CreatorsGroupController::class, 'index'])->name('kr.mspc.creators.group.index');
            Route::post('/group', [MSPC\CreatorsGroupController::class, 'store'])->name('kr.mspc.creators.group.store');
            Route::get('/group/create', [MSPC\CreatorsGroupController::class, 'create'])->name('kr.mspc.creators.group.create');
            Route::get('/{groupSeq}/group/edit', [MSPC\CreatorsGroupController::class, 'edit'])->name('kr.mspc.creators.group.edit')
                ->whereNumber('groupSeq');
            Route::patch('/{groupSeq}/group', [MSPC\CreatorsGroupController::class, 'update'])->name('kr.mspc.creators.group.update')
                ->whereNumber('groupSeq');

            // 크리에이터
            Route::get('/creator', [MSPC\CreatorsCreatorController::class, 'index'])->name('kr.mspc.creators.creator.index');
            Route::post('/creator', [MSPC\CreatorsCreatorController::class, 'store'])->name('kr.mspc.creators.creator.store');
            Route::get('/creator/create', [MSPC\CreatorsCreatorController::class, 'create'])->name('kr.mspc.creators.creator.create');
            Route::get('/{creatorSeq}/creator/edit', [MSPC\CreatorsCreatorController::class, 'edit'])->name('kr.mspc.creators.creator.edit')
                ->whereNumber('creatorSeq');
            Route::patch('/{creatorSeq}/creator', [MSPC\CreatorsCreatorController::class, 'update'])->name('kr.mspc.creators.creator.update')
                ->whereNumber('creatorSeq');

            // 스폰서
            Route::get('/{creatorSeq}/sponsorship', [MSPC\CreatorsSponsorshipController::class, 'index'])->name('kr.mspc.creators.sponsorship.index')
                ->whereNumber('creatorSeq');

            // 크리에이터 심사승인/심사취소
            Route::patch('/{creatorSeq}/{type}/creator', [MSPC\CreatorsCreatorDecisionController::class, 'update'])->name('kr.mspc.creators.decision.update')
            ->whereNumber('creatorSeq')->where('type', 'cancel|approve');
            // 스폰서 후원승인/취소
            Route::patch('/{sponsorshipSeq}/{type}/sponsorship', [MSPC\CreatorsSponsorshipController::class, 'update'])->name('kr.mspc.creators.sponsorship.update')
            ->whereNumber('sponsorshipSeq')->where('type', 'cancel|approve');
        });
    });

    // kr/gz 국내 GZ_ADMIN
    Route::prefix('/kr/gz')->middleware(['permission:gz'])->group(function () {
        Route::prefix('/service')->group(function () {
            // 게임 서비스 상태 관리
            Route::get('/status', [GZ\ServiceStatusController::class, 'show'])->name('kr.gz.service.status.show');
            Route::patch('/status', [GZ\ServiceStatusController::class, 'update'])->name('kr.gz.service.status.update');
        });

        Route::prefix('/block')->group(function () {
            // 계정블럭
            Route::get('/account', [GZ\BlockAccountController::class, 'index'])->name('kr.gz.block.account.index');
            Route::post('/account', [GZ\BlockAccountController::class, 'store'])->name('kr.gz.block.account.store');
            Route::delete('/{memberSrl}/account', [GZ\BlockAccountController::class, 'destroy'])->name('kr.gz.block.account.destroy')
                ->whereNumber('memberSrl');
            Route::get('/account/create', [GZ\BlockAccountController::class, 'create'])->name('kr.gz.block.account.create');
        });

        Route::prefix('/banner')->group(function () {
            // 배너 관리
            Route::get('/main', [GZ\BannerMainController::class, 'index'])->name('kr.gz.banner.main.index');
            Route::get('/main/create', [GZ\BannerMainController::class, 'create'])->name('kr.gz.banner.main.create');
            Route::post('/main', [GZ\BannerMainController::class, 'store'])->name('kr.gz.banner.main.store');
            Route::delete('/{bannerId}/main', [GZ\BannerMainController::class, 'destroy'])->name('kr.gz.banner.main.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/main/edit', [GZ\BannerMainController::class, 'edit'])->name('kr.gz.banner.main.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/main', [GZ\BannerMainController::class, 'update'])->name('kr.gz.banner.main.update')
                ->whereNumber('bannerId');
        });

        Route::prefix('/link')->group(function () {
            // 링크 관리
            Route::get('/download', [GZ\LinkDownloadController::class, 'show'])->name('kr.gz.link.download.show');
            Route::patch('/download', [GZ\LinkDownloadController::class, 'update'])->name('kr.gz.link.download.update');
        });
    });

    // kr/nx 국내 NX_ADMIN
    Route::prefix('/kr/nx')->middleware(['permission:nx'])->group(function () {
        Route::prefix('/service')->group(function () {
            // 게임 서비스 상태 관리
            Route::get('/status', [NX\ServiceStatusController::class, 'show'])->name('kr.nx.service.status.show');
            Route::patch('/status', [NX\ServiceStatusController::class, 'update'])->name('kr.nx.service.status.update');
        });

        Route::prefix('/block')->group(function () {
            // 계정블럭
            Route::get('/account', [NX\BlockAccountController::class, 'index'])->name('kr.nx.block.account.index');
            Route::post('/account', [NX\BlockAccountController::class, 'store'])->name('kr.nx.block.account.store');
            Route::delete('/{memberSrl}/account', [NX\BlockAccountController::class, 'destroy'])->name('kr.nx.block.account.destroy')
                ->whereNumber('memberSrl');
            Route::get('/account/create', [NX\BlockAccountController::class, 'create'])->name('kr.nx.block.account.create');
        });

        Route::prefix('/banner')->group(function () {
            // 배너 관리
            Route::get('/main', [NX\BannerMainController::class, 'index'])->name('kr.nx.banner.main.index');
            Route::get('/main/create', [NX\BannerMainController::class, 'create'])->name('kr.nx.banner.main.create');
            Route::post('/main', [NX\BannerMainController::class, 'store'])->name('kr.nx.banner.main.store');
            Route::delete('/{bannerId}/main', [NX\BannerMainController::class, 'destroy'])->name('kr.nx.banner.main.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/main/edit', [NX\BannerMainController::class, 'edit'])->name('kr.nx.banner.main.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/main', [NX\BannerMainController::class, 'update'])->name('kr.nx.banner.main.update')
                ->whereNumber('bannerId');
        });

        Route::prefix('/transfer')->group(function () {
            // 계정 이관
            Route::get('/daum', [NX\TransferDaumController::class, 'index'])->name('kr.nx.transfer.daum.index');
        });
    });

    // kr/lh 국내 LH_ADMIN
    Route::prefix('/kr/lh')->middleware(['permission:lh'])->group(function () {
        Route::prefix('/service')->group(function () {
            // 게임 서비스 상태 관리
            Route::get('/status', [LH\ServiceStatusController::class, 'show'])->name('kr.lh.service.status.show');
            Route::patch('/status', [LH\ServiceStatusController::class, 'update'])->name('kr.lh.service.status.update');
        });

        Route::prefix('/block')->group(function () {
            // 계정블럭
            Route::get('/account', [LH\BlockAccountController::class, 'index'])->name('kr.lh.block.account.index');
            Route::post('/account', [LH\BlockAccountController::class, 'store'])->name('kr.lh.block.account.store');
            Route::delete('/{memberSrl}/account', [LH\BlockAccountController::class, 'destroy'])->name('kr.lh.block.account.destroy')
                ->whereNumber('memberSrl');
            Route::get('/account/create', [LH\BlockAccountController::class, 'create'])->name('kr.lh.block.account.create');
        });

        Route::prefix('/link')->group(function () {
            // 리다이렉트 링크관리
            Route::get('/redirect', [LH\LinkRedirectController::class, 'edit'])->name('kr.lh.link.redirect.edit');
            Route::patch('/redirect', [LH\LinkRedirectController::class, 'update'])->name('kr.lh.link.redirect.update');

            // 다운로드 링크관리
            Route::get('/{server}/download', [LH\LinkDownloadController::class, 'edit'])->name('kr.lh.link.download.edit')
                ->where('server', '(general|test)');
            Route::patch('/download', [LH\LinkDownloadController::class, 'update'])->name('kr.lh.link.download.update');
        });

        Route::prefix('/user')->group(function () {
            // 라그하임포인트(LH)
            Route::get('/point', [LH\UserPointController::class, 'index'])->name('kr.lh.user.point.index');
            Route::get('/{lpuIdx}/point/edit', [LH\UserPointController::class, 'edit'])->name('kr.lh.user.point.edit')
                ->whereNumber('lpuIdx');
            Route::patch('/{lpuIdx}/point', [LH\UserPointController::class, 'update'])->name('kr.lh.user.point.update');

            // 이관 현황 관리
            Route::get('/transfer', [LH\UserTransferController::class, 'index'])->name('kr.lh.user.transfer.index');
            Route::patch('/transfer', [LH\UserTransferController::class, 'update'])->name('kr.lh.user.transfer.update');
            Route::delete('/{lhId}/transfer', [LH\UserTransferController::class, 'destroy'])->name('kr.lh.user.transfer.destroy')
                ->where('lhId', '[a-zA-Z0-9\-_]+');

            // 바른손 계정 관리
            Route::get('/oldaccount', [LH\UserOldAccountController::class, 'index'])->name('kr.lh.user.oldaccount.index');
            Route::patch('/{userId}/oldaccount', [LH\UserOldAccountController::class, 'update'])->name('kr.lh.user.oldaccount.update')
                ->where('userId', '[a-zA-Z0-9\-_]+');
        });

        Route::prefix('/reset')->group(function () {
            // 2차 패스워드 초기화
            Route::get('/second-password', [LH\ResetSecondPassword::class, 'index'])->name('kr.lh.reset.second.password.index');
            Route::patch('/{memberSrl}/second-password', [LH\ResetSecondPassword::class, 'update'])->name('kr.lh.reset.second.password.update')
            ->whereNumber('memberSrl');
        });

        Route::prefix('/banner')->group(function () {
            // 배너 관리, 메인
            Route::get('/main', [LH\BannerMainController::class, 'index'])->name('kr.lh.banner.main.index');
            Route::get('/main/create', [LH\BannerMainController::class, 'create'])->name('kr.lh.banner.main.create');
            Route::post('/main', [LH\BannerMainController::class, 'store'])->name('kr.lh.banner.main.store');
            Route::delete('/{bannerId}/main', [LH\BannerMainController::class, 'destroy'])->name('kr.lh.banner.main.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/main/edit', [LH\BannerMainController::class, 'edit'])->name('kr.lh.banner.main.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/main', [LH\BannerMainController::class, 'update'])->name('kr.lh.banner.main.update')
                ->whereNumber('bannerId');

            // 배너 관리, 서브
            Route::get('/sub', [LH\BannerSubController::class, 'index'])->name('kr.lh.banner.sub.index');
            Route::get('/sub/create', [LH\BannerSubController::class, 'create'])->name('kr.lh.banner.sub.create');
            Route::post('/sub', [LH\BannerSubController::class, 'store'])->name('kr.lh.banner.sub.store');
            Route::delete('/{bannerId}/sub', [LH\BannerSubController::class, 'destroy'])->name('kr.lh.banner.sub.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/sub/edit', [LH\BannerSubController::class, 'edit'])->name('kr.lh.banner.sub.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/sub', [LH\BannerSubController::class, 'update'])->name('kr.lh.banner.sub.update')
                ->whereNumber('bannerId');
        });

        Route::prefix('/statistics')->group(function () {
            // 동시접속자, MAX 동시접속자
            Route::get('/{type}', [LH\StatisticsConnectController::class, 'show'])->name('kr.lh.statistics.connect.show')
            ->where('type', '(connect|max-connect)');
        });

        // 이벤트 관리
        Route::prefix('/event')->group(function () {
            // 통합 이벤트
            Route::prefix('/integration')->group(function () {
                // 이벤트 목록
                Route::get('/management', [LH\EventManagementController::class, 'index'])->name('kr.lh.event.integration.management.index');
                Route::get('/management/create', [LH\EventManagementController::class, 'create'])->name('kr.lh.event.integration.management.create');
                Route::post('/management', [LH\EventManagementController::class, 'store'])->name('kr.lh.event.integration.management.store');
                Route::get('/{eventId}/management/read', [LH\EventManagementController::class, 'show'])->name('kr.lh.event.integration.management.read')
                    ->whereNumber('eventId');
                Route::get('/{eventId}/management/edit', [LH\EventManagementController::class, 'edit'])->name('kr.lh.event.integration.management.edit')
                    ->whereNumber('eventId');
                Route::patch('/{eventId}/management', [LH\EventManagementController::class, 'update'])->name('kr.lh.event.integration.management.update')
                    ->whereNumber('eventId');

                // 이벤트 보상
                Route::get('/{eventId}/reward/create', [LH\EventRewardController::class, 'create'])->name('kr.lh.event.integration.reward.create')
                    ->whereNumber('eventId');
                Route::post('/reward', [LH\EventRewardController::class, 'store'])->name('kr.lh.event.integration.reward.store');
                Route::get('/{eventId}/reward/{rewardId}/edit', [LH\EventRewardController::class, 'edit'])->name('kr.lh.event.integration.reward.edit')
                    ->whereNumber('eventId')->whereNumber('rewardId');
                Route::patch('/{eventId}/reward/{rewardId}', [LH\EventRewardController::class, 'update'])->name('kr.lh.event.integration.reward.update')
                    ->whereNumber('eventId')->whereNumber('rewardId');
                Route::delete('/{eventId}/reward/{rewardId}', [LH\EventRewardController::class, 'destroy'])->name('kr.lh.event.integration.reward.destroy')
                    ->whereNumber('eventId')->whereNumber('rewardId');

                // 아이템 지급 로그
                Route::get('/{eventId}/receive', [LH\EventReceiveLogController::class, 'index'])->name('kr.lh.event.integration.receive.index')
                    ->whereNumber('eventId');
                Route::delete('/{eventId}/receive/{receiveId}', [LH\EventReceiveLogController::class, 'destroy'])->name('kr.lh.event.integration.receive.destroy')
                    ->whereNumber('eventId')->whereNumber('receiveId');

                // 캐릭터 선택 로그
                Route::get('/{eventId}/select', [LH\EventSelectLogController::class, 'index'])->name('kr.lh.event.integration.select.index')
                    ->whereNumber('eventId');
                Route::delete('/{eventId}/select/{selectId}', [LH\EventSelectLogController::class, 'destroy'])->name('kr.lh.event.integration.select.destroy')
                    ->whereNumber('eventId')->whereNumber('selectId');

                // 이벤트 보상 수동 지급
                Route::get('/manual', [LH\EventManualController::class, 'index'])->name('kr.lh.event.integration.manual.index');
                Route::get('/{eventId}/manual/create', [LH\EventManualController::class, 'create'])->name('kr.lh.event.integration.manual.create')
                    ->whereNumber('eventId');
                Route::post('/{eventId}/manual', [LH\EventManualController::class, 'store'])->name('kr.lh.event.integration.manual.store')
                    ->whereNumber('eventId');
            });

            // 상시 출석 체크
            Route::prefix('/attend')->group(function () {
                // 출석 설정
                Route::get('/duration', [LH\EventAttendDurationController::class, 'index'])->name('kr.lh.event.attend.duration.index');
                Route::patch('/duration', [LH\EventAttendDurationController::class, 'update'])->name('kr.lh.event.attend.duration.update');
                Route::post('/duration/reset', [LH\EventAttendDurationController::class, 'reset'])->name('kr.lh.event.attend.duration.reset');

                // 보상 관리
                Route::get('/reward', [LH\EventAttendRewardController::class, 'index'])->name('kr.lh.event.attend.reward.index');
                Route::get('/reward/create', [LH\EventAttendRewardController::class, 'create'])->name('kr.lh.event.attend.reward.create');
                Route::post('/reward', [LH\EventAttendRewardController::class, 'store'])->name('kr.lh.event.attend.reward.store');
                Route::get('/{rewardId}/reward/edit', [LH\EventAttendRewardController::class, 'edit'])->name('kr.lh.event.attend.reward.edit')
                    ->whereNumber('rewardId');
                Route::patch('/{rewardId}/reward', [LH\EventAttendRewardController::class, 'update'])->name('kr.lh.event.attend.reward.update')
                    ->whereNumber('rewardId');
                Route::delete('/{rewardId}/reward', [LH\EventAttendRewardController::class, 'destroy'])->name('kr.lh.event.attend.reward.destroy')
                    ->whereNumber('rewardId');
            });
        });

        // 라그샵 관리
        Route::prefix('/shop')->group(function () {
            // 캐시샵 아이템 관리
            Route::get('/cash', [LH\ShopCashController::class, 'index'])->name('kr.lh.shop.cash.index');
            Route::get('/cash/create', [LH\ShopCashController::class, 'create'])->name('kr.lh.shop.cash.create');
            Route::post('/cash', [LH\ShopCashController::class, 'store'])->name('kr.lh.shop.cash.store');
            Route::get('/{itemId}/cash/edit', [LH\ShopCashController::class, 'edit'])->name('kr.lh.shop.cash.edit')
                ->whereNumber('itemId');
            Route::patch('/{itemId}/cash', [LH\ShopCashController::class, 'update'])->name('kr.lh.shop.cash.update')
                ->whereNumber('itemId');
            Route::delete('/{itemId}/cash', [LH\ShopCashController::class, 'destroy'])->name('kr.lh.shop.cash.destroy')
                ->whereNumber('itemId');

            // L.P MALL 아이템
            Route::get('/lp', [LH\ShopLPController::class, 'index'])->name('kr.lh.shop.lp.index');
            Route::get('/lp/create', [LH\ShopLPController::class, 'create'])->name('kr.lh.shop.lp.create');
            Route::post('/lp', [LH\ShopLPController::class, 'store'])->name('kr.lh.shop.lp.store');
            Route::get('/{itemId}/lp/edit', [LH\ShopLPController::class, 'edit'])->name('kr.lh.shop.lp.edit')
                ->whereNumber('itemId');
            Route::patch('/{itemId}/lp', [LH\ShopLPController::class, 'update'])->name('kr.lh.shop.lp.update')
                ->whereNumber('itemId');
            Route::delete('/{itemId}/lp', [LH\ShopLPController::class, 'destroy'])->name('kr.lh.shop.lp.destroy')
                ->whereNumber('itemId');
        });

        // 로그 관리
        Route::prefix('/log')->group(function () {
            // 상시 출석 로그
            Route::get('/attend', [LH\LogAttendController::class, 'index'])->name('kr.lh.log.attend.index');

            // 캐시샵 구매 로그
            Route::get('/cash', [LH\LogCashItemController::class, 'index'])->name('kr.lh.log.cash.index');

            // 복귀자 아이템 구매 로그
            Route::get('/return', [LH\LogReturnItemController::class, 'index'])->name('kr.lh.log.return.index');

            // 인게임 구매 로그
            Route::get('/ingame', [LH\LogIngameItemController::class, 'index'])->name('kr.lh.log.ingame.index');

            // 계정이동권 사용 로그
            Route::get('/move', [LH\LogMoveAccountController::class, 'index'])->name('kr.lh.log.move.index');

            // 게임스타트 로그
            Route::get('/gamestart', [LH\LogGameStartController::class, 'index'])->name('kr.lh.log.gamestart.index');

            // 가위바위보 로그
            Route::get('/rpcgame', [LH\LogRPCGameController::class, 'index'])->name('kr.lh.log.rpcgame.index');
        });
    });

    // kr/fh 국내 FH_ADMIN
    Route::prefix('/kr/fh')->middleware(['permission:fh'])->group(function () {
        // 서비스 관리
        Route::prefix('/service')->group(function () {
            // 게임 서비스 상태 관리
            Route::get('/status', [FH\ServiceStatusController::class, 'show'])->name('kr.fh.service.status.show');
            Route::patch('/status', [FH\ServiceStatusController::class, 'update'])->name('kr.fh.service.status.update');
        });

        // 링크 관리
        Route::prefix('/link')->group(function () {
            // 리다이렉트 링크관리
            Route::get('/redirect', [FH\LinkRedirectController::class, 'edit'])->name('kr.fh.link.redirect.edit');
            Route::patch('/redirect', [FH\LinkRedirectController::class, 'update'])->name('kr.fh.link.redirect.update');
        });

        // 팝업 관리
        Route::prefix('/popup')->group(function () {
            // 팝업 정보
            Route::get('/info', [FH\PopupController::class, 'edit'])->name('kr.fh.popup.info.edit');
            Route::patch('/info', [FH\PopupController::class, 'update'])->name('kr.fh.popup.info.update');
        });

        Route::prefix('/banner')->group(function () {
            // 배너 관리, 메인
            Route::get('/main', [FH\BannerMainController::class, 'index'])->name('kr.fh.banner.main.index');
            Route::get('/main/create', [FH\BannerMainController::class, 'create'])->name('kr.fh.banner.main.create');
            Route::post('/main', [FH\BannerMainController::class, 'store'])->name('kr.fh.banner.main.store');
            Route::delete('/{bannerId}/main', [FH\BannerMainController::class, 'destroy'])->name('kr.fh.banner.main.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/main/edit', [FH\BannerMainController::class, 'edit'])->name('kr.fh.banner.main.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/main', [FH\BannerMainController::class, 'update'])->name('kr.fh.banner.main.update')
                ->whereNumber('bannerId');

            // 배너 관리, 서브
            Route::get('/sub', [FH\BannerSubController::class, 'index'])->name('kr.fh.banner.sub.index');
            Route::get('/sub/create', [FH\BannerSubController::class, 'create'])->name('kr.fh.banner.sub.create');
            Route::post('/sub', [FH\BannerSubController::class, 'store'])->name('kr.fh.banner.sub.store');
            Route::delete('/{bannerId}/sub', [FH\BannerSubController::class, 'destroy'])->name('kr.fh.banner.sub.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/sub/edit', [FH\BannerSubController::class, 'edit'])->name('kr.fh.banner.sub.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/sub', [FH\BannerSubController::class, 'update'])->name('kr.fh.banner.sub.update')
                ->whereNumber('bannerId');

            // 배너 관리, 메인 우측 하단
            Route::get('/bottomright', [FH\BannerBottomRightController::class, 'index'])->name('kr.fh.banner.bottomright.index');
            Route::get('/bottomright/create', [FH\BannerBottomRightController::class, 'create'])->name('kr.fh.banner.bottomright.create');
            Route::post('/bottomright', [FH\BannerBottomRightController::class, 'store'])->name('kr.fh.banner.bottomright.store');
            Route::delete('/{bannerId}/bottomright', [FH\BannerBottomRightController::class, 'destroy'])->name('kr.fh.banner.bottomright.destroy')
                ->whereNumber('bannerId');
            Route::get('/{bannerId}/bottomright/edit', [FH\BannerBottomRightController::class, 'edit'])->name('kr.fh.banner.bottomright.edit')
                ->whereNumber('bannerId');
            Route::patch('/{bannerId}/bottomright', [FH\BannerBottomRightController::class, 'update'])->name('kr.fh.banner.bottomright.update')
                ->whereNumber('bannerId');
        });
    });
});

require __DIR__ . '/auth.php';

Route::fallback(function () {
    return inertia('Errors/Default', []);
});
