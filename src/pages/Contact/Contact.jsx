import React from 'react';
import Navbar from '../../components/Navbar';
import './Contact.css';
import testImage from './test.jpg';

const teamMembers = [
  {
    name: 'James Li-Xu',
    position: 'Senior, Computer Science',
    location: 'New York, NY',
    imageUrl: testImage
  },
  {
    name: 'Michael Rivera',
    position: '---',
    location: '---',
    imageUrl: testImage
  },
  {
    name: 'Jhon Guzman',
    position: '---',
    location: '---',
    imageUrl: testImage
  },
  {
    name: 'Ivan Chen',
    position: '',
    location: '---',
    imageUrl: testImage
  }
];

const Contact = () => {
  return (
    <div className="contactpage-container">
      <Navbar className="contact-navbar" />
      <div className="contact-container">
        <h1>TEAM ROCKET</h1>
        <p></p>
        <div className="team-member-container">
          {teamMembers.map(member => (
            <div className="team-member-card" key={member.name}>
              <img src={member.imageUrl} alt={member.name} />
              <h2>{member.name}</h2>
              <p>{member.position}</p>
              <p>{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
