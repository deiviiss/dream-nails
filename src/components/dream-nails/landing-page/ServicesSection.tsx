import { SectionTitle } from './ui-custom/SectionTitle'
import { ServiceCard } from './ui-custom/ServiceCard'

export function ServicesSection() {
  const services = [
    {
      title: 'Manos de ensueño',
      description: 'Servicios profesionales para tus manos',
      items: [
        'Uñas Acrílicas',
        'Encapsulado de Uña Natural',
        'Gel Semi',
        'Rubber Gel',
        'Manicure / Drill Manicure',
        'Capping Builder',
        'Softgel'
      ],
      color: '#d47983'
    },
    {
      title: 'Pies impecables',
      description: 'Servicios profesionales para tus pies',
      items: ['Pedicure Estética Xpress', 'Pedicure Spa con Gel', 'Acripie', 'Retiro de Uñas Enterradas'],
      color: '#c68db6'
    },
    {
      title: 'Retiros Profesionales',
      description: 'Servicios de retiro con cuidado experto',
      items: ['Retiro de Acrílico', 'Retiro de Gel Semi', 'Retiro de Rubber'],
      color: '#d099a6'
    }
  ]

  return (
    <section id="services" className="py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#f8f0f2' }}>
      <div className="container space-y-12 px-8 md:px-12 lg:px-16 mx-auto">
        <SectionTitle
          title="Nuestros Servicios"
          description="Ofrecemos servicios profesionales de nail art con atención personalizada y técnicas innovadoras"
          center
        />
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              items={service.items}
              color={service.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
