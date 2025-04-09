import { CourseCard } from './ui-custom/CourseCard'
import { SectionTitle } from './ui-custom/SectionTitle'

export function CoursesSection() {
  const courses = [
    {
      title: 'Acrílico en Tip',
      description: 'Aprende desde cero la aplicación de acrílico con tips para lograr uñas resistentes y elegantes.'
    },
    {
      title: 'Rubber y Gel',
      description: 'Domina estas técnicas para uñas más naturales, flexibles y de larga duración.'
    },
    {
      title: 'Perfeccionamiento',
      description: 'Si ya tienes experiencia, lleva tus habilidades al siguiente nivel con técnicas avanzadas.'
    },
    {
      title: 'Softegel',
      description: 'Descubre el sistema revolucionario de uñas sin limado y con máxima adherencia.'
    },
    {
      title: 'Polygel + Esmaltado',
      description:
        'La combinación perfecta para uñas fuertes y ligeras, ideal para quienes buscan opciones sin monómero.'
    },
    {
      title: 'Capping Builder Gel',
      description:
        'Aprende a fortalecer y proteger uñas naturales con gel constructor, ideal para clientes que buscan resistencia sin extensiones.'
    }
  ]

  return (
    <section id="courses" className="container py-12 md:py-24 lg:py-32 px-8 md:px-12 lg:px-16 mx-auto">
      <SectionTitle
        title="Cursos Especializados"
        description="Formación personalizada en grupos reducidos para dominar las técnicas de Nail Art"
        center
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 gap-y-20">
        {courses.map((course, index) => (
          <CourseCard key={index} title={course.title} description={course.description} />
        ))}
      </div>
    </section>
  )
}
