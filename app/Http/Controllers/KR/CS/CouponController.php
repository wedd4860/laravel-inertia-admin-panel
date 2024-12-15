<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Models\KR\TCouponEvent;
use App\Models\KR\TCoupon;
use App\Models\KR\LCoupon;
use App\Http\Resources\KR\CS\CouponEventResource;
use App\Http\Resources\KR\CS\CouponLogResource;
use App\Http\Requests\KR\CS\StoreCouponNumberRequest;
use App\Services\ExcelExportService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CouponController extends Controller
{
    private ExcelExportService $excelExportService;

    public function __construct(ExcelExportService $excelExportService)
    {
        $this->excelExportService = $excelExportService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:,reg_date',
                'order_type' => 'in:desc,asc',
                'member_srl' => 'int',
                'user_id' => 'string',
                'event_name' => 'string',
                'number_coupon' => 'string',
                'reg_date' => 'string', // date
            ]);
            //정렬
            $sortColumn = request('sort_column', 'reg_date');
            $orderType = request('order_type', 'desc');

            $query = LCoupon::query();

            if (request('member_srl')) {
                $query->where('member_srl', 'like', '%' . request('member_srl') . '%');
            }
            if (request('user_id')) {
                $query->where('user_id', 'like', '%' . request('user_id') . '%');
            }
            if (request('event_name')) {
                $query->where('event_name', 'like', '%' . request('event_name') . '%');
            }
            if (request('number_coupon')) {
                $query->where('number_coupon', 'like', '%' . request('number_coupon') . '%');
            }

            $couponLog = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Coupon/Number/Index', [
                'couponLog' => CouponLogResource::collection($couponLog),
                'queryParams' => request()->query() ?: null,
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(int $couponEventId)
    {
        try {
            if (TCoupon::where('event_index', $couponEventId)->count()) {
                return to_route('kr.cs.coupon.event.read', ['couponEventId' => $couponEventId]);
            }

            $couponEvent = TCouponEvent::query()->where('event_index', $couponEventId)->firstOrFail();
            $couponNumbers = collect([]);
            for ($i = 0; $i < $couponEvent['make_coupon']; $i++) {
                $strCouponCode = Str::upper((Str::random(4))) . '-' . Str::upper((Str::random(4))) . '-' . Str::upper((Str::random(4))) . '-' . Str::upper((Str::random(4)));
                $couponNumbers->push([
                    'number_coupon' => $strCouponCode,
                    'string_coupon' => null,
                ]);
            }
            $aCouponNumber = $couponNumbers->toArray();

            return inertia('KR/CS/Coupon/Number/Create', [
                'couponEvent' => new CouponEventResource($couponEvent),
                'couponNumber' => $aCouponNumber,
                'success' => session()->get('success') ?? '',
                'toast' => session()->get('toast') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCouponNumberRequest $request)
    {
        try {
            $data = $request->validated();
            $aCouponNumber = collect($data['coupons'])->pluck('number_coupon')->toArray();

            if (TCoupon::whereIn('number_coupon', $aCouponNumber)->count()) {
                return $this->flashToast(['toast' => '쿠폰 번호에 중복이 존재하여 새로고침 되었습니다. 다시 시도해 주시기 바랍니다.']);
            }

            $iEventIndex = $data['event_index'];
            $aCouponData = collect(collect($data)->get('coupons'))->map(function ($item) use ($iEventIndex) {
                $item['event_index'] = $iEventIndex;
                return $item;
            });
            $aCouponData = $aCouponData->toArray();

            TCoupon::insert($aCouponData);

            return to_route('kr.cs.coupon.event.read', ['couponEventId' => $data['event_index']])
                ->with('success', $data['event_index'] . '번 이벤트의 쿠폰 생성이 완료되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $couponEventId, string $couponNumber, Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:,reg_date',
                'order_type' => 'in:desc,asc',
                'user_id' => 'string',
                'member_srl' => 'int',
                'reg_date' => 'string', // date
            ]);
            //정렬
            $sortColumn = request('sort_column', 'reg_date');
            $orderType = request('order_type', 'desc');

            $query = LCoupon::query();

            if (request('user_id')) {
                $query->where('user_id', 'like', '%' . request('user_id') . '%');
            }
            if (request('member_srl')) {
                $query->where('member_srl', 'like', '%' . request('member_srl') . '%');
            }

            $couponLog = $query->where('number_coupon', $couponNumber)
                ->orderBy($sortColumn, $orderType)
                ->paginate(15)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Coupon/Number/Read', [
                'couponEventId' => $couponEventId,
                'couponNumber' => $couponNumber,
                'couponLog' => CouponLogResource::collection($couponLog),
                'queryParams' => request()->query() ?: null,
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }

    public function downloadCouponUsed(int $couponEventId, string $couponNumber): BinaryFileResponse
    {
        $headers = ['유저번호', '유저아이디', '사용 날짜'];  // Example headers

        $data = LCoupon::query()->select('member_srl', 'user_id', 'reg_date')
            ->where('number_coupon', $couponNumber)
            ->orderBy('reg_date', 'desc')->get()->toArray();

        $filename = 'CouponUsed_' . $couponNumber . '_' . time() . '.xlsx';

        $path = $this->excelExportService->exportExcelDefault($headers, $data, $filename);

        return response()->download($path)->deleteFileAfterSend(true);
    }
}
