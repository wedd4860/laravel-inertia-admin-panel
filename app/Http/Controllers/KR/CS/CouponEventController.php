<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use App\Models\KR\TCouponEvent;
use App\Models\KR\TCoupon;
use App\Http\Resources\KR\CS\CouponEventResource;
use App\Http\Resources\KR\CS\CouponNumberResource;
use App\Http\Requests\KR\CS\StoreCouponEventRequest;

class CouponEventController extends Controller
{
    public function __construct()
    {
        //
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:,reg_date,start_event,end_event',
                'order_type' => 'in:desc,asc',
                'event_name' => 'string',
                'contants' => 'string',
                'start_event' => 'string', // date
                'end_event' => 'string', // date
                'reg_date' => 'string', // date
            ]);
            //정렬
            $sortColumn = request('sort_column', 'reg_date');
            $orderType = request('order_type', 'desc');

            $query = TCouponEvent::query();

            if (request('event_name')) {
                $query->where('event_name', 'like', '%' . request('event_name') . '%');
            }
            if (request('contants')) {
                $query->where('contants', request('contants'));
            }

            $coupons = $query->whereNotNull('event_name')->withCount('numberCoupon')
                ->orderBy($sortColumn, $orderType)
                ->paginate(10)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Coupon/Event/Index', [
                'coupons' => CouponEventResource::collection($coupons),
                'queryParams' => request()->query() ?: null,
                'success' => session()->get('success') ?? '',
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return inertia('KR/CS/Coupon/Event/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCouponEventRequest $request)
    {
        try {
            $data = $request->validated();
            $data['start_event'] = (new Carbon($data['start_event']))->format('Y-m-d H:i');
            $data['end_event'] = (new Carbon($data['end_event']))->format('Y-m-d H:i');

            $iCouponIndex = TCouponEvent::insertGetId($data, 'event_index');

            return to_route('kr.cs.coupon.number.create', ['couponEventId' => $iCouponIndex]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $couponEventId)
    {
        try {
            $couponNumber = TCoupon::withCount('logCoupon')
                ->where('event_index', $couponEventId)
                ->get();

            if (!$couponNumber->count()) {
                return to_route('kr.cs.coupon.number.create', ['couponEventId' => $couponEventId])
                    ->with('toast', '쿠폰 번호 생성작업을 완료해 주시기 바랍니다.');
            }

            $couponEvent = TCouponEvent::where('event_index', $couponEventId)->firstOrFail();

            return inertia('KR/CS/Coupon/Event/Read', [
                'couponEvent' => new CouponEventResource($couponEvent),
                'couponNumber' => CouponNumberResource::collection($couponNumber),
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
    public function update(int $couponEventId, int $status)
    {
        try {
            $couponEvent = TCouponEvent::query()->where('event_index', $couponEventId)->firstOrFail();

            if ($status === 0) {
                $now = (new Carbon())->format('Y-m-d H:i');
                $couponEvent['start_event'] = (new Carbon($couponEvent['start_event']))->format('Y-m-d H:i');
                $couponEvent['end_event'] = (new Carbon($couponEvent['end_event']))->format('Y-m-d H:i');
                if ($couponEvent['event_status'] != 0 && ($couponEvent['end_event'] > $now && $couponEvent['start_event'] < $now)) {
                    TCouponEvent::query()->where('event_index', $couponEventId)->update(['event_status' => $status]);
                    return to_route('kr.cs.coupon.event.index')
                    ->with('success', $couponEventId . '번 쿠폰 이벤트를 시작하였습니다.');
                } else {
                    return to_route('kr.cs.coupon.event.index')
                    ->with('success', '시작할 수 없는 쿠폰 이벤트입니다.');
                }
            } elseif ($status === 1) {
                if ($couponEvent['event_status'] == 0) {
                    TCouponEvent::query()->where('event_index', $couponEventId)->update(['event_status' => $status]);
                    return to_route('kr.cs.coupon.event.index')
                    ->with('success', $couponEventId . '번 쿠폰 이벤트를 종료하였습니다.');
                } else {
                    return to_route('kr.cs.coupon.event.index')
                    ->with('success', '종료할 수 없는 쿠폰 이벤트입니다.');
                }
            } else {
                throw new \Exception();
            }
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $couponEventId)
    {
        try {
            if (!TCouponEvent::query()->where('event_index', $couponEventId)->whereNot('event_status', '0')->delete()) {
                throw new \Exception();
            }

            return to_route('kr.cs.coupon.event.index')
                ->with('success', '쿠폰이 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
