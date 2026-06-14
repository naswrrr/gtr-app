import React, { createContext, useContext, useState, useEffect } from 'react';
import rawCustomers from '../data/customersData.json';

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [currentCustomerId, setCurrentCustomerId] = useState('');
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [vouchersList, setVouchersList] = useState([]);

  // Initialize data
  useEffect(() => {
    // Add vehicle to customers dynamically if not present for better simulation
    const vehicles = [
      'Toyota Avanza Veloz (B 2345 SIF)',
      'Honda Civic RS (B 1289 KLO)',
      'Yamaha NMAX 155 (B 6543 TGB)',
      'Mitsubishi Pajero Sport (B 9876 VBN)',
      'Honda HR-V Turbo (B 4321 PLK)'
    ];

    const processed = rawCustomers.map((cust, idx) => {
      // Pick a vehicle based on customer index or fallback
      const v = cust.interactions?.find(i => i.vehicle)?.vehicle || vehicles[idx % vehicles.length];
      return {
        ...cust,
        vehicle: v,
        vehicles: [v, idx % 3 === 0 ? 'Honda BeAT (B 3098 PQR)' : null].filter(Boolean)
      };
    });

    setCustomers(processed);

    // Get active customer from localStorage or use first active customer (e.g. CUST-001)
    const savedId = localStorage.getItem('fixflow_selected_cust_id');
    const defaultId = savedId && processed.some(c => c.id === savedId) ? savedId : 'CUST-001';
    setCurrentCustomerId(defaultId);

    // Check logged in state
    const loggedIn = localStorage.getItem('fixflow_customer_logged_in') === 'true';
    setIsCustomerLoggedIn(loggedIn);
  }, []);

  // Update currentCustomer when currentCustomerId or customers change
  useEffect(() => {
    if (customers.length > 0 && currentCustomerId) {
      const found = customers.find(c => c.id === currentCustomerId);
      if (found) {
        setCurrentCustomer(found);
        localStorage.setItem('fixflow_selected_cust_id', currentCustomerId);

        // Load points history for this customer
        const joinYear = found.joinDate ? found.joinDate.split('-')[0] : '2025';
        const mockPointsHistory = [
          { id: 1, type: 'in', amount: 150, date: `${joinYear}-12-10`, desc: 'Servis Berkala & Ganti Oli' },
          { id: 2, type: 'in', amount: 75, date: '2026-02-15', desc: 'Tune Up Mesin & Gurah Karbon' },
          { id: 3, type: 'out', amount: 50, date: '2026-03-01', desc: 'Redeem Voucher Oli Rp 50.000' },
          { id: 4, type: 'in', amount: 200, date: '2026-04-18', desc: 'Spooring, Balancing & Rotasi Ban' },
        ];

        // Dynamic points based on customer's orders/spent
        const calculatedPoints = Math.round(found.orders * 15 - (found.spent ? parseFloat(found.spent.replace(/[^0-9.]/g, '')) / 20 : 0));
        const finalPoints = Math.max(calculatedPoints, 375); // Ensure they have some points
        setPointsHistory(mockPointsHistory);

        // Load vouchers for this customer
        const isPremium = found.tier === 'Premium';
        const mockVouchers = [
          { id: 'VCH-NEW-01', title: 'Voucher Member Baru', code: 'FIXNEW2026', discount: 'Rp 25.000', type: 'Member', status: 'Expired', expiry: '2026-01-31', desc: 'Potongan langsung untuk servis pertama Anda' },
          { id: 'VCH-BRT-02', title: 'Voucher Ulang Tahun', code: 'FIXBDAYSPECIAL', discount: 'Potongan 20%', type: 'Birthday', status: 'Active', expiry: '2026-07-31', desc: 'Diskon spesial 20% di bulan ulang tahun Anda' },
          { id: 'VCH-LOY-03', title: 'Loyal Customer Service Reward', code: 'FIXLOYALTY50', discount: 'Rp 50.000', type: 'Loyalty', status: 'Active', expiry: '2026-12-31', desc: 'Apresiasi loyalitas servis rutin Anda di FixFlow' },
          { id: 'VCH-SVC-04', title: 'Free Fogging & AC Sterilizer', code: 'FIXFREESHOWER', discount: 'Free Jasa AC', type: 'Service', status: 'Active', expiry: '2026-09-30', desc: 'Gratis sterilisasi kabin & fogging setelah servis berkala' }
        ];

        // Custom birthday voucher validation
        const customerBirthMonth = found.birthDate ? parseInt(found.birthDate.split('-')[1]) : 6;
        const currentMonth = 6; // June 2026 based on local time metadata
        if (customerBirthMonth !== currentMonth) {
          // Change birthday voucher status to Used or Expired if it's not their birthday month
          mockVouchers[1].status = 'Expired';
        }

        setVouchersList(mockVouchers);

        // Load CRM mock notifications for this customer
        const defaultNotifications = [
          {
            id: 'nt-stnk',
            title: '⚠️ Reminder STNK Kendaraan',
            message: `STNK kendaraan ${found.vehicle} Anda akan habis masa berlaku dalam waktu dekat. Jangan lupa lakukan pembayaran pajak tahunan!`,
            type: 'stnk',
            date: '1 hari yang lalu',
            read: false,
            channel: 'WhatsApp & Email'
          },
          {
            id: 'nt-oli',
            title: '🛢️ Reminder Ganti Oli Mesin',
            message: `Sudah berjalan sekitar 5.000 km sejak servis terakhir. Jadwalkan ganti oli mesin di FixFlow untuk menjaga performa mesin ${found.vehicle.split(' (')[0]}.`,
            type: 'oli',
            date: '3 hari yang lalu',
            read: false,
            channel: 'WhatsApp'
          },
          {
            id: 'nt-bday',
            title: '🎂 Kejutan Promo Ulang Tahun!',
            message: `Selamat Hari Jadi, ${found.name}! Nikmati voucher ulang tahun diskon 20% yang sudah ditambahkan ke dompet voucher Anda.`,
            type: 'birthday',
            date: '5 hari yang lalu',
            read: true,
            channel: 'WhatsApp & Email'
          }
        ];
        setNotifications(defaultNotifications);

        // Load bookings
        const savedBookings = JSON.parse(localStorage.getItem(`fixflow_bookings_${found.id}`)) || [];
        setBookings(savedBookings);
      }
    }
  }, [currentCustomerId, customers]);

  // Select customer (Simulate Switcher)
  const selectCustomer = (id) => {
    setCurrentCustomerId(id);
    // If switcher is used, auto-log in the simulated customer for smoother testing experience
    setIsCustomerLoggedIn(true);
    localStorage.setItem('fixflow_customer_logged_in', 'true');
  };

  // Login customer
  const loginCustomer = (email) => {
    const found = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentCustomerId(found.id);
      setIsCustomerLoggedIn(true);
      localStorage.setItem('fixflow_customer_logged_in', 'true');
      localStorage.setItem('fixflow_selected_cust_id', found.id);
      return { success: true, customer: found };
    }
    return { success: false, message: 'Email tidak terdaftar di database CRM FixFlow.' };
  };

  // Logout customer
  const logoutCustomer = () => {
    setIsCustomerLoggedIn(false);
    localStorage.removeItem('fixflow_customer_logged_in');
  };

  // Add new booking
  const addBooking = (bookingData) => {
    if (!currentCustomer) return;
    const newBooking = {
      id: `BKG-${Math.floor(100000 + Math.random() * 900000)}`,
      dateCreated: new Date().toISOString().split('T')[0],
      status: 'Booking Diterima', // received -> in_progress -> waiting_parts -> quality_check -> completed
      progress: 20, // 20%, 40%, 60%, 80%, 100%
      mechanicName: 'Andi Wijaya (Senior Engine Master)',
      ...bookingData
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem(`fixflow_bookings_${currentCustomer.id}`, JSON.stringify(updated));

    // Send automation notification
    const bookingNotif = {
      id: `nt-bkg-${Date.now()}`,
      title: '✅ Booking Service Berhasil',
      message: `Booking Anda untuk kendaraan ${bookingData.vehicle} pada tanggal ${bookingData.date} pukul ${bookingData.time} telah terdaftar. Layanan: ${bookingData.services.join(', ')}.`,
      type: 'booking',
      date: 'Baru saja',
      read: false,
      channel: 'WhatsApp'
    };
    setNotifications(prev => [bookingNotif, ...prev]);

    return newBooking;
  };

  // Update booking status (for simulation)
  const updateBookingStatus = (bookingId, newStatus, newProgress) => {
    if (!currentCustomer) return;
    const updated = bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus, progress: newProgress };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem(`fixflow_bookings_${currentCustomer.id}`, JSON.stringify(updated));

    // Add notification about status update
    const statusNotif = {
      id: `nt-status-${Date.now()}`,
      title: '🔧 Update Status Servis',
      message: `Servis Anda dengan kode ${bookingId} saat ini berstatus: "${newStatus}".`,
      type: 'tracking',
      date: 'Baru saja',
      read: false,
      channel: 'WhatsApp'
    };
    setNotifications(prev => [statusNotif, ...prev]);
  };

  // Add notification
  const addNotification = (notif) => {
    const newNotif = {
      id: `nt-custom-${Date.now()}`,
      date: 'Baru saja',
      read: false,
      channel: 'WhatsApp',
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Mark all notifications as read
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Redeem voucher using points
  const redeemVoucherWithPoints = (pointsCost, voucherTitle, discount) => {
    if (!currentCustomer) return false;

    // Add point out transaction
    const newTx = {
      id: pointsHistory.length + 1,
      type: 'out',
      amount: pointsCost,
      date: new Date().toISOString().split('T')[0],
      desc: `Redeem ${voucherTitle}`
    };

    setPointsHistory(prev => [newTx, ...prev]);

    // Add voucher to wallet
    const newVoucher = {
      id: `VCH-RDM-${Math.floor(10000 + Math.random() * 90000)}`,
      title: voucherTitle,
      code: `REDEEM${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      discount: discount,
      type: 'Loyalty',
      status: 'Active',
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days expiry
      desc: `Didapatkan dari penukaran ${pointsCost} Poin Loyalitas`
    };

    setVouchersList(prev => [newVoucher, ...prev]);

    // Add notification
    addNotification({
      title: '🎁 Penukaran Voucher Berhasil',
      message: `Voucher ${voucherTitle} senilai ${discount} berhasil ditukarkan dengan ${pointsCost} poin. Gunakan sebelum kadaluarsa!`,
      type: 'loyalty',
    });

    return true;
  };

  return (
    <CustomerContext.Provider value={{
      customers,
      currentCustomer,
      isCustomerLoggedIn,
      bookings,
      notifications,
      pointsHistory,
      vouchersList,
      selectCustomer,
      loginCustomer,
      logoutCustomer,
      addBooking,
      updateBookingStatus,
      addNotification,
      markAllRead,
      redeemVoucherWithPoints
    }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
}
