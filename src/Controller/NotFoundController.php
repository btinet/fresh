<?php

namespace App\Controller;

use App\AbstractController;

class NotFoundController extends AbstractController
{
    public function notFound($path): string
    {
        return "Pfad nicht gefunden: {$path}";
    }
}