<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\UpdateBannerRequest;
use App\Http\Requests\KR\CS\StoreBannerRequest;
use App\Http\Resources\KR\CS\SiteBannerResource;
use App\Repositories\KR\CS\BannerRepository;
use App\Models\KR\TSiteBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

class BannerMainController extends Controller
{
    protected $bannerRepository;
    protected $siteNo;
    protected $contentNo;
    protected $imageSpot; //배너위치

    public function __construct(BannerRepository $bannerRepository)
    {
        $this->bannerRepository = $bannerRepository;
        $this->siteNo = Arr::first(config('globalvar.site_number'), function ($val, $key) {
            return $val['name'] == '마상소프트';
        })['id'];
        $this->contentNo = config('globalvar.content_number.cs');
        $this->imageSpot = 1;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $aValidated = $request->validate([
                'sort_column' => 'in:imageOrder,regDate',
                'order_type' => 'in:desc,asc',
                'image_target_link' => 'string',
                'image_title' => 'string',
            ]);

            $sortColumn = Arr::get($aValidated, 'sort_column', 'imageOrder');
            $orderType = Arr::get($aValidated, 'order_type', 'desc');
            $query = TSiteBanner::query();
            if (Arr::get($aValidated, 'image_target_link')) {
                $query->where('imageTargetlink', 'like', '%' . Arr::get($aValidated, 'image_target_link') . '%');
            }
            if (Arr::get($aValidated, 'image_title')) {
                $query->where('imageTitle', 'like', '%' . Arr::get($aValidated, 'image_title') . '%');
            }
            $banners = $query->where('siteNo', $this->siteNo)->where('contentNo', $this->contentNo)->where('imageSpot', $this->imageSpot)
                ->orderBy($sortColumn, $orderType)
                ->paginate(10)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Banner/Main/Index', [
                'banners' => SiteBannerResource::collection($banners),
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
    public function create()
    {
        try {
            return inertia('KR/CS/Banner/Main/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBannerRequest $request)
    {
        try {
            $aValidated = $request->validated();
            $aValidated['siteNo'] = $this->siteNo;
            $aValidated['contentNo'] = $this->contentNo;
            $aValidated['imageSpot'] = $this->imageSpot;
            $aValidated['sdate'] = $aValidated['sdate'] != '' ? (new Carbon($aValidated['sdate']))->format('Y-m-d H:i') : '' ;
            $aValidated['edate'] = $aValidated['edate'] != '' ? (new Carbon($aValidated['edate']))->format('Y-m-d H:i') : '' ;
            $this->bannerRepository->insertCSBanner($aValidated);
            return to_route('kr.cs.banner.main.index')
                ->with('success', $aValidated['imageOrder'] . '번째 배너가 등록되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function edit(int $bannerId)
    {
        try {
            $banner = TSiteBanner::query()->where('idx', $bannerId)->firstOrFail();
            return inertia('KR/CS/Banner/Main/Edit', [
                'banner' => new SiteBannerResource($banner),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBannerRequest $request, int $bannerId)
    {
        try {
            $aValidated = $request->validated();
            $aValidated['sdate'] = $aValidated['sdate'] != '' ? (new Carbon($aValidated['sdate']))->format('Y-m-d H:i') : '' ;
            $aValidated['edate'] = $aValidated['edate'] != '' ? (new Carbon($aValidated['edate']))->format('Y-m-d H:i') : '' ;
            $banner = TSiteBanner::where('idx', $bannerId);
            $banner->firstOrFail();
            $banner->update($aValidated);
            return to_route('kr.cs.banner.main.edit', ['bannerId' => $bannerId])
                ->with('success', '배너 정보가 수정되었습니다.');
        } catch (\Exception $e) {
            $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $bannerId)
    {
        try {
            if (!TSiteBanner::query()->where('idx', $bannerId)->delete()) {
                throw new \Exception();
            }
            return to_route('kr.cs.banner.main.index')
                ->with('success', '배너가 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
