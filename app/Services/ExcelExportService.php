<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ExcelExportService
{
    public function exportExcelDefault(array $headers, array $data, string $filename): string
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $strColumn = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($strColumn++ . '1', $header);
        }

        foreach ($data as $rowIdx => $row) {
            $strColumn = 'A';
            $rowNumber = $rowIdx + 2;
            foreach ($row as $cellValue) {
                $sheet->setCellValueExplicit($strColumn++ . $rowNumber, $cellValue, DataType::TYPE_STRING);
            }
        }

        $path = storage_path('app/' . $filename);
        $writer = new Xlsx($spreadsheet);
        $writer->save($path);

        return $path;
    }
}
