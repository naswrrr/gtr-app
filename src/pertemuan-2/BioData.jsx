import React from 'react';
// Pastikan file ini ada di src/assets/choii.jpg
import fotoProfil from '../assets/choii.jpg'; 

// parent component (komponen utama)
export default function BioData() {
  return (
    <div>
      <h1 className="title">Pemrograman Framework Lanjutan</h1>
      <Greeting />
      <UserCard 
        nama="Choi Hyun Wook"
        nim="20024567"
        tanggal="30 Januari 2002"
        alamat="Seoul, South Korea"
        hobi="Photography & Actor"
        prodi="Contemporary Art"
        kampus="Hanlim Multi Art School"
      />
      <QuoteText />
    </div>
  );
}

function Greeting() {
  return (
    <p style={{ textAlign: 'center', fontSize: '0.85rem', fontStyle: 'italic' }}>
      Selamat Belajar ReactJs, Semoga Menyenangkan!
    </p>
  );
}

function UserCard(props) {
  return (
    <div className="user-card">
      <hr />
      <div className="profile-wrapper">
        <img src={fotoProfil} alt="Profile" className="profile-img" />
      </div>
      <p><b>Nama</b> <span>{props.nama}</span></p>
      <p><b>NIM</b> <span>{props.nim}</span></p>
      <p><b>Lahir</b> <span>{props.tanggal}</span></p>
      <p><b>Alamat</b> <span>{props.alamat}</span></p>
      <p><b>Hobi</b> <span>{props.hobi}</span></p>
      <p><b>Prodi</b> <span>{props.prodi}</span></p>
      <p><b>Kampus</b> <span>{props.kampus}</span></p>
    </div>
  );
}

function QuoteText() {
  const text = "Art is the journey of a free soul.";
  return (
    <div className="quote-text">
      <hr />
      <p>"{text.toUpperCase()}"</p>
      <small>— Beautiful Mind</small>
    </div>
  );
}
