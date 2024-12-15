<?php

namespace App\Library;

class MasangConfig
{
    public static function sha2Enc($password): string
    {
        $password_md5 = md5($password);
        $salt = substr($password_md5, 0, 16) . '16d7a4fca7442dda';
        return hash('sha256', $salt . $password_md5);
    }

    public static function generateRandomPw($length = 8, $strength = 0): array
    {
        $vowels = 'aeuy';
        $consonants = 'bdghjmnpqrstvz';
        if ($strength & 1) {
            $consonants .= 'BDGHJLMNPQRSTVWXZ';
        }
        if ($strength & 2) {
            $vowels .= "AEUY";
        }
        if ($strength & 4) {
            $consonants .= '23456789';
        }
        if ($strength & 8) {
            $consonants .= '@#$%';
        }

        $password = '';
        $alt = time() % 2;
        for ($i = 0; $i < $length; $i++) {
            if ($alt == 1) {
                $password .= $consonants[(rand() % strlen($consonants))];
                $alt = 0;
            } else {
                $password .= $vowels[(rand() % strlen($vowels))];
                $alt = 1;
            }
        }

        $mysqlPw = '*'.strtoupper(hash('sha1',pack('H*',hash('sha1', $password))));
        $salt = substr($mysqlPw, 0,16).'16d7a4fca7442dda';
        $newPw = hash('sha256', $salt.$mysqlPw);

        $aReturn = [
            'userPw' => $password,
            'dbPw' => $newPw,
        ];

        return $aReturn;
    }


}
