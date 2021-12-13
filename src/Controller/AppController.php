<?php

namespace App\Controller;

use App\AbstractController;

class AppController extends AbstractController
{

    public function index(): string
    {
        return $this->render('app/index.html.twig',[
            'controller_name' => 'Home'
        ]);
    }

    public function imprint(): string
    {
        return $this->render('app/imprint.html.twig',[
            'controller_name' => 'Imprint'
        ]);
    }

    public function tos(): string
    {
        return $this->render('app/tos.html.twig',[
            'controller_name' => 'Terms of Service'
        ]);
    }

}
