<?php

namespace App\Controller;

use App\AbstractController;

class AppController extends AbstractController
{

    public function index(): string
    {
        return $this->render('app/index.html.twig',[
            'controller_name' => 'AppController'
        ]);
    }

}
