<?php
namespace App\Controller;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use \Symfony\Component\HttpFoundation\Request;
use App\Service\Register;

class HomeController extends AbstractController {
    /**
     * @Route ("/",name="home")
     */
    public function index(Request $request) {
        return $this->render("Home/home.twig");
    }
   
    /**
     * @Route ("/submit-form",name="create")
     */
    public function create(Register $register, Request $request, EntityManagerInterface $entityManager) {
        if (!$request->isMethod("POST")) return $this->render("Home/sendInfo.twig", ['html' => "Dane muszą być wysłane metodą POST"]);

        $validation = $register->isValidatedOk($request);
        if (!$validation[0]) return $this->render("Home/sendInfo.twig", ['html' => "Błąd walidacji: ".$validation[1]]);

        $register->create($request);
        return $this->render("Home/sendInfo.twig", ['html' => "Pomyślnie utworzono"]);
    }
}

?>