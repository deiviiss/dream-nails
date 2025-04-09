import { SectionTitle } from './ui-custom/SectionTitle'
import { TestimonialCard } from './ui-custom/TestimonialCard'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'María González',
      role: 'Cliente de servicios',
      content:
        'La atención personalizada en Dream Nails es incomparable. Mis uñas nunca habían lucido tan bien y duran muchísimo. El ambiente es acogedor y el equipo muy profesional.',
      img: '/testimonial-1.png'
    },
    {
      name: 'Laura Martínez',
      role: 'Estudiante de curso Acrílico',
      content:
        'Los cursos son increíbles. Grupos pequeños que permiten una atención muy personalizada. En poco tiempo he aprendido técnicas que pensé que me llevarían meses dominar. ¡Totalmente recomendado!',
      img: '/testimonial-2.png'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Participante de workshop',
      content:
        'El workshop de diseños en tendencia superó mis expectativas. Técnicas actuales, materiales de primera y una instructora que realmente sabe transmitir su conocimiento. Volveré por más.',
      img: '/testimonial-3.png'
    }
  ]

  return (
    <section id="testimonials" className="py-12 md:py-24 lg:py-32 bg-[#f8f0f2]">
      <div className="container space-y-12 px-8 md:px-12 lg:px-16 mx-auto">
        <SectionTitle
          title="Lo que dicen nuestros clientes"
          description="Experiencias reales de quienes han confiado en Dream Nails"
          center
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              img={testimonial.img}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
