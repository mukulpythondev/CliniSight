import React, { useEffect, useState } from "react";
import { User, Phone, Mail, MapPin, Heart, Clock, FileText, AlertTriangle, Pill } from "lucide-react";

const Dashboard = () => {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this ID with actual one
  const patientId = "685830c4e7fe09b655fc55e7";

  useEffect(() => {
    fetch(`http://localhost:8000/patient/${patientId}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data.patient);
        setRecords(data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
      case 'completed': return { backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #bfdbfe' };
      case 'pending': return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
      case 'cancelled': return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' };
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'appointment': return <Clock size={16} />;
      case 'lab': return <FileText size={16} />;
      case 'prescription': return <Pill size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const styles = {
    container: {
      minHeight: '1200px',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#111827',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#6b7280',
      margin: 0
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid #f3f4f6'
    },
    patientHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px'
    },
    patientIcon: {
      backgroundColor: '#e0e7ff',
      padding: '12px',
      borderRadius: '50%',
      marginRight: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    patientName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    patientMeta: {
      color: '#6b7280',
      margin: 0
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '8px',
      margin: 0
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#374151'
    },
    contactIcon: {
      color: '#6b7280'
    },
    bloodGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#374151'
    },
    tagContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '4px'
    },
    tag: {
      padding: '4px 8px',
      fontSize: '0.75rem',
      borderRadius: '9999px',
      fontWeight: '500'
    },
    allergyTag: {
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    },
    medicationTag: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      border: '1px solid #bfdbfe'
    },
    emergencyContact: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    emergencyName: {
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    emergencyRole: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: '0 0 8px 0'
    },
    emergencyPhone: {
      fontSize: '0.875rem',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      margin: 0
    },
    historyItem: {
      fontSize: '0.875rem',
      color: '#374151',
      backgroundColor: '#f9fafb',
      padding: '8px 12px',
      borderRadius: '6px',
      margin: '4px 0'
    },
    recordsHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px'
    },
    recordsIcon: {
      backgroundColor: '#dcfce7',
      padding: '12px',
      borderRadius: '50%',
      marginRight: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    recordsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    recordsCount: {
      color: '#6b7280',
      margin: 0
    },
    recordsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    recordCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e5e7eb',
      transition: 'box-shadow 0.2s ease',
      cursor: 'default'
    },
    recordCardHover: {
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    recordHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    recordLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    recordIconWrapper: {
      backgroundColor: 'white',
      padding: '8px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    recordTitleWrapper: {
      display: 'flex',
      flexDirection: 'column'
    },
    recordTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    recordType: {
      fontSize: '0.875rem',
      color: '#6b7280',
      textTransform: 'capitalize',
      margin: 0
    },
    recordRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    statusBadge: {
      padding: '6px 12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      borderRadius: '6px',
      textTransform: 'capitalize'
    },
    recordDate: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    recordDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px'
    },
    recordDetail: {
      margin: 0
    },
    recordLabel: {
      fontWeight: '600',
      color: '#374151'
    },
    recordValue: {
      color: '#6b7280',
      marginTop: '4px'
    },
    loadingContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    spinner: {
      width: '32px',
      height: '32px',
      border: '3px solid #e5e7eb',
      borderTop: '3px solid #4f46e5',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      color: '#374151',
      fontWeight: '500'
    },
    errorContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    errorCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      textAlign: 'center'
    },
    errorIcon: {
      color: '#dc2626',
      margin: '0 auto 16px auto'
    },
    errorTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 8px 0'
    },
    errorText: {
      color: '#6b7280',
      margin: 0
    },
    noRecords: {
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '1rem',
      fontStyle: 'italic'
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingCard}>
          <div style={styles.spinner}></div>
          <span style={styles.loadingText}>Loading patient data...</span>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!patient) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <AlertTriangle size={48} style={styles.errorIcon} />
          <h3 style={styles.errorTitle}>Patient Not Found</h3>
          <p style={styles.errorText}>Unable to load patient information.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Patient Dashboard</h1>
          <p style={styles.subtitle}>Comprehensive patient information and medical records</p>
        </div>

        {/* Patient Details Card */}
        <div style={styles.card}>
          <div style={styles.patientHeader}>
            <div style={styles.patientIcon}>
              <User size={32} color="#4f46e5" />
            </div>
            <div>
              <h2 style={styles.patientName}>{patient.name}</h2>
              <p style={styles.patientMeta}>{patient.age} years old • {patient.gender}</p>
            </div>
          </div>

          <div style={styles.grid}>
            {/* Contact Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Contact Information</h3>
              <div style={styles.contactItem}>
                <Mail size={20} style={styles.contactIcon} />
                <span>{patient.email}</span>
              </div>
              <div style={styles.contactItem}>
                <Phone size={20} style={styles.contactIcon} />
                <span>{patient.phone}</span>
              </div>
              <div style={styles.contactItem}>
                <MapPin size={20} style={styles.contactIcon} />
                <span>{patient.address}</span>
              </div>
            </div>

            {/* Medical Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Medical Information</h3>
              <div style={styles.bloodGroup}>
                <Heart size={20} color="#dc2626" />
                <span>Blood Group: <strong>{patient.blood_group}</strong></span>
              </div>
              {patient.allergies && patient.allergies.length > 0 && (
                <div>
                  <p style={{margin: '0 0 8px 0', fontWeight: '600', color: '#111827'}}>Allergies</p>
                  <div style={styles.tagContainer}>
                    {patient.allergies.map((allergy, idx) => (
                      <span key={idx} style={{...styles.tag, ...styles.allergyTag}}>
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {patient.current_medications && patient.current_medications.length > 0 && (
                <div>
                  <p style={{margin: '0 0 8px 0', fontWeight: '600', color: '#111827'}}>Current Medications</p>
                  <div style={styles.tagContainer}>
                    {patient.current_medications.map((med, idx) => (
                      <span key={idx} style={{...styles.tag, ...styles.medicationTag}}>
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Contact & History */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Emergency Contact</h3>
              {patient.emergency_contact && (
                <div style={styles.emergencyContact}>
                  <p style={styles.emergencyName}>{patient.emergency_contact.name}</p>
                  <p style={styles.emergencyRole}>{patient.emergency_contact.relationship}</p>
                  <p style={styles.emergencyPhone}>
                    <Phone size={16} />
                    {patient.emergency_contact.phone}
                  </p>
                </div>
              )}
              
              {patient.medical_history && patient.medical_history.length > 0 && (
                <div>
                  <p style={{margin: '0 0 8px 0', fontWeight: '600', color: '#111827'}}>Medical History</p>
                  <div>
                    {patient.medical_history.map((history, idx) => (
                      <p key={idx} style={styles.historyItem}>
                        {history}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Medical Records */}
        <div style={styles.card}>
          <div style={styles.recordsHeader}>
            <div style={styles.recordsIcon}>
              <FileText size={32} color="#16a34a" />
            </div>
            <div>
              <h2 style={styles.recordsTitle}>Medical Records</h2>
              <p style={styles.recordsCount}>{records.length} records found</p>
            </div>
          </div>

          {records.length > 0 ? (
            <div style={styles.recordsGrid}>
              {records.map((record, idx) => (
                <div 
                  key={idx} 
                  style={styles.recordCard}
                  onMouseEnter={(e) => e.target.style.boxShadow = styles.recordCardHover.boxShadow}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                >
                  <div style={styles.recordHeader}>
                    <div style={styles.recordLeft}>
                      <div style={styles.recordIconWrapper}>
                        {getTypeIcon(record.type)}
                      </div>
                      <div style={styles.recordTitleWrapper}>
                        <h3 style={styles.recordTitle}>{record.title}</h3>
                        <p style={styles.recordType}>{record.type}</p>
                      </div>
                    </div>
                    <div style={styles.recordRight}>
                      <span style={{...styles.statusBadge, ...getStatusColor(record.status)}}>
                        {record.status}
                      </span>
                      <span style={styles.recordDate}>
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.recordDetails}>
                    <div style={styles.recordDetail}>
                      <div style={styles.recordLabel}>Description</div>
                      <div style={styles.recordValue}>{record.description}</div>
                    </div>
                    <div style={styles.recordDetail}>
                      <div style={styles.recordLabel}>Notes</div>
                      <div style={styles.recordValue}>{record.notes}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.noRecords}>No records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;