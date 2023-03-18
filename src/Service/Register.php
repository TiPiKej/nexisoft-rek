<?php
namespace App\Service;

use \Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use \Symfony\Component\HttpFoundation\Request;
use App\Entity\Internship;
use App\Entity\Registration;
use \Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class Register
{
    /** @var EntityManagerInterface **/
    private $entityManager;

    /** @var ParameterBagInterface **/
    private $parameterBag;

    public function __construct(EntityManagerInterface $entityManager, ParameterBagInterface $parameterBag)
    {
        $this->entityManager = $entityManager;
        $this->parameterBag = $parameterBag;
    }

    public function create(Request $request): void
    {
        $registration = new Registration();
        $registration->setName($request->get("name"));
        $registration->setSurname($request->get("surname"));
        $registration->setBirthDate($request->get("birthDate"));
        $registration->setEmail($request->get("email"));
        $registration->setEducation($request->get("education"));

        $this->entityManager->persist($registration);

        for ($i = 0; $i < sizeof($request->request->all("internship-companyNames")); $i++) {
            $companyName = $request->request->all("internship-companyNames")[$i];
            $from = $request->request->all("internship-from")[$i];
            $to = $request->request->all("internship-to")[$i];

            $internship = new Internship();
            $internship->setRegistration($registration);
            $internship->setName($companyName);
            $internship->setFromDate($from);
            $internship->setToDate($to);
            $this->entityManager->persist($internship);
        }

        $this->entityManager->flush();

        $this->saveFiles($registration->getId(), $request);
    }

    public function saveFiles(int $registrationId, Request $request): void
    {
        $prefixName = "RegistrationId-".$registrationId;
        $cv = $request->files->get('CV');
        $this->uploadFile($cv, $prefixName."_CV");

        $lm = $request->files->get('LM');
        $this->uploadFile($lm, $prefixName."_LM");

        if (!is_null($request->files->get("extraAttachments"))) {
            for ($i = 0; $i < sizeof($request->files->get('extraAttachments')); $i++) {
                $addictional = $request->files->get('extraAttachments')[$i];
                $this->uploadFile($addictional, $prefixName."_ADDICTIONAL-".($i+1));
            }
        }
    }

    public function uploadFile(UploadedFile $uploadedFile, string $name): void {
        $mainPath = $this->parameterBag->get('uploads');
        $name = $name."_".uniqid().".".$uploadedFile->getClientOriginalExtension();

        try {

            $uploadedFile->move($mainPath, $name);
            
        } catch (Exception $ex) { }
    }

    public function isValidatedOk(Request $request)
    {
        $strPattern = "/^.+$/i";
        $datePattern = "/^\d{4}-\d{2}-\d{2}$/i";

        if (!preg_match($strPattern, $request->get("name"))) {
            return [False, "Bledne imie"];
        }
        if (!preg_match($strPattern, $request->get("surname"))) {
            return [False, "Bledne nazwisko"];
        }
        if (!preg_match($datePattern, $request->get("birthDate"))) {
            return [False, "Bledna data urodzenia"];
        }
        if (!filter_var($request->get("email"), FILTER_VALIDATE_EMAIL)) {
            return [False, "Bledny email"];
        }
        if (!preg_match($strPattern, $request->get("education"))) {
            return [False, "Bledne wyksztalcenie"];
        }
        if (!$this->IsFileUploaded("LM")) {
            return [False, "Brak pliku LM"];
        }
        if (!$this->IsFileUploaded("CV")) {
            return [False, "Brak pliku CV"];
        }

        for ($i = 0; $i < sizeof($request->request->all("internship-companyNames")); $i++) {
            if (!preg_match($strPattern, $request->request->all("internship-companyNames")[$i])) {
                return [False, "Bledna nazwa firmy stazowej"];
            }
            if (!preg_match($datePattern, $request->request->all("internship-from")[$i])) {
                return [False, "Bledna data poczatkowa stazu"];
            }
            if (!preg_match($datePattern, $request->request->all("internship-to")[$i])) {
                return [False, "Bledna data konca stazu"];
            }
        }

        return [True];
    }

    public function IsFileUploaded($field_name): bool
    {
        if (count($_FILES) <= 0) return false;

        if (empty($_FILES[$field_name]['name'])) return false;

        if (!is_uploaded_file($_FILES[$field_name]['tmp_name'])) return false;

        return true;
    }
}

?>