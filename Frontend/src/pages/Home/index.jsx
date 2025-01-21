import React from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import FeatureItem from '../../components/FeatureItem';
import IconChat from "../../assets/img/icon-chat.png";
import IconMoney from "../../assets/img/icon-money.png";
import IconSecurity from "../../assets/img/icon-security.png"


const Home = () => {

  const features = [
    {
      icon: IconChat,
      title: 'You are our #1 priority',
      description:
        'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      icon: IconMoney,
      title: 'More savings means higher rates',
      description:
        'The more you save with us, the higher your interest rate will be!',
    },
    {
      icon: IconSecurity,
      title: 'Security you can trust',
      description:
        'We use top of the line encryption to make sure your data and money is always safe.',
    },
  ];

  return (
    <div className='content-body'>
    <NavBar />    
    <main className="main">
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <div className="features">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </div>
  )
}

export default Home