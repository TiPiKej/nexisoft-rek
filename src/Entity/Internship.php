<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="Internship")
 * @ORM\HasLifecycleCallbacks
 */
class Internship {
    /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue()
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity="Registration", inversedBy="internships")
     * @ORM\JoinColumn(name="registration", referencedColumnName="id")
     */
    private $registration;

    /**
     * @ORM\Column(name="name", type="string", length=50)
     */
    private string $name;

    /**
     * @ORM\Column(name="fromDate", type="date")
     */
    private $fromDate;

    /**
     * @ORM\Column(name="toDate", type="date")
     */
    private $toDate;

    public function getId(): int { return $this->id; }

    public function setRegistration(Registration $registration): void { $this->registration = $registration; }

    public function setName(string $name): void { $this->name = $name; }

    public function setFromDate($fromDate): void { $this->fromDate = new \DateTime($fromDate); }

    public function setToDate($toDate): void { $this->toDate = new \DateTime($toDate); }
}

?>
