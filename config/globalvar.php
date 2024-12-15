<?php

return [
    //관리자 ip
    'admin' => [
        'ip' => ['112.185.196.17', '112.185.196.48', '127.0.0.1']
    ],
    //빌링사 api용 코드
    'bp' => [
        'api' => [
            'qa' => [
                'ao' => 1,
                'fh' => 2,
                'nx' => 3,
                'gz' => 4,
                'dk' => 5,
                'pt' => 6,
                'sr' => 8,
                'cc' => 9,
                'lh' => 10,
            ],
            'live' => [
                'ao' => 1,
                'fh' => 2,
                'nx' => 3,
                'gz' => 4,
                'dk' => 5,
                'pt' => 6,
                'sr' => 7,
                'cc' => 8,
                'lh' => 10,
            ]
        ]
    ],
    'url' => [
        'live' => [
            'kr' => 'https://www.masanggames.co.kr'
        ],
        'qa' => [
            'kr' => 'https://qa.masanggames.co.kr'
        ]
    ],
    'permission' => [
        //MSPC : 파트너크리에이터
        'group' => 'ALL,CS,DK,LH,PT,FH,GZ,AO,NCC,SR,NX,AI,MSPC'
    ],
    'creator' => [
        'group' => [
            ['id' => 1, 'name' => 'AO'],
            ['id' => 2, 'name' => 'FH'],
            ['id' => 3, 'name' => 'NX'],
            ['id' => 4, 'name' => 'GZ'],
            ['id' => 5, 'name' => 'DK'],
            ['id' => 6, 'name' => 'PT'],
            ['id' => 7, 'name' => 'SR'],
            ['id' => 8, 'name' => 'CC'],
            ['id' => 10, 'name' => 'LH'],
        ]
    ],
    'block_list' => [
        'nx' => 3,
        'gz' => 5,
        'lh' => 9,
    ],
    'content_number' => [
        'ao' => 1,
        'fh' => 2,
        'nx' => 3,
        'gz' => 4,
        'dk' => 5,
        'pt' => 6,
        'sr' => 7,
        'cc' => 8,
        'lh' => 9,
        'cs' => 10,
    ],
    'site_number' => [
        ['id' => 0, 'name' => '공통'],
        ['id' => 1, 'name' => '마상소프트'],
        ['id' => 2, 'name' => '문피아'],
        ['id' => 3, 'name' => '피카온'],
        ['id' => 4, 'name' => '오로바둑'],
        ['id' => 5, 'name' => '다음'],
        ['id' => 6, 'name' => '온게이트'],
        ['id' => 7, 'name' => '한게임'],
    ],
    'lh_server_kr' => [
        ['id' => 1, 'name' => '갤럭시'],
        ['id' => 7, 'name' => '아케론'],
        ['id' => 8, 'name' => '헤르메스'],
        ['id' => 9, 'name' => '카시오페아'],
    ]
];
