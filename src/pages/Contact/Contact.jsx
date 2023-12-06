import React from 'react';
import Navbar from '../../components/Navbar';
import './Contact.css';
import testImage from './photos/test2.png';
import testImage2 from './photos/test.jpg';
import testImage3 from './photos/test4.jpg';
import testImage4 from './photos/huh.jpg';

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
    imageUrl: testImage2
  },
  {
    name: 'Jhon Guzman',
    position: '---',
    location: '---',
    imageUrl: testImage3
  },
  {
    name: 'Ivan Chen',
    position: '',
    location: '---',
    imageUrl: testImage4
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
