<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="Registration")
 * @ORM\HasLifecycleCallbacks
 */
class Registration {
    /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue()
     */
    private int $id;

    /**
     * @ORM\OneToMany(targetEntity="Internship", mappedBy="registration")
     */
    private $internships;

    /**
     * @ORM\Column(name="name", type="string", length=50)
     */
    private string $name;

    /**
     * @ORM\Column(name="surname", type="string", length=50)
     */
    private string $surname;

    /**
     * @ORM\Column(name="birthDate", type="date")
     */
    private $birthDate;

    /**
     * @ORM\Column(name="email", type="string", length=50)
     */
    private string $email;

    /**
     * @ORM\Column(name="education", type="string", length=50)
     */
    private string $education;

    public function getId(): int { return $this->id; }

    public function setName(string $name): void { $this->name = $name; }

    public function setSurname(string $surname): void { $this->surname = $surname; }

    public function setBirthDate($birthDate): void { $this->birthDate = new \DateTime($birthDate); }

    public function setEmail(string $email): void { $this->email = $email; }

    public function setEducation(string $education): void { $this->education = $education; }
}

?>
