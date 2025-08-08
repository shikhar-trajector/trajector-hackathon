import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Send, Phone, ChevronDown, ChevronRight } from 'lucide-react';

interface IntakeDashboardProps {
  onLogout: () => void;
}

interface Client {
  id: number;
  name: string;
  mobile: string;
  email: string;
  status: string;
  lastSent: string;
}

export const IntakeDashboard = ({ onLogout }: IntakeDashboardProps) => {
  const [loading, setLoading] = useState<number | null>(null);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [notes, setNotes] = useState<{ [key: number]: string }>({});
  const API_HOST = import.meta.env.VITE_API_HOST;

  const clients: Client[] = [
    { id: 1, name: 'Sahil Chandel', mobile: '+91 7018763780', email: 'sahil@example.com', status: 'Pending', lastSent: '2023-10-01' },
    { id: 2, name: 'Akbar Khan', mobile: '+91 9670867797', email: 'akbar@example.com', status: 'Completed', lastSent: '2023-09-28' },
    { id: 3, name: 'Shikhar Gupta', mobile: '+91 8957566790', email: 'shikhar@example.com', status: 'Pending', lastSent: '2023-10-02' },
  ];

  const handleSendMagicLink = async (client: Client, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row expansion when clicking the button
    setLoading(client.id);
    setSuccess('');
    setError('');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("bypass-tunnel-reminder", "true");
    const encodedName = encodeURIComponent(client.name);

    try {
      const response = await fetch(`${API_HOST}/api/documents/send-message`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          to: client.mobile.replace(/\D/g, ''),
          message: `Hey ${client.name}👋, Please upload file in this link : https://trajector-hackathon.vercel.app/upload?name=${encodedName}&phone=${client.mobile.replace(/\D/g, '')}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to send WhatsApp message');

      setSuccess(`Successfully sent magic link to ${client.name}`);
    } catch (err) {
      console.error(err);
      setError(`Failed to send magic link to ${client.name}`);
    } finally {
      setLoading(null);
    }
  };

  const handleNotesChange = (clientId: number, value: string) => {
    setNotes({ ...notes, [clientId]: value });
  };

  return (
    <div className="min-h-screen bg-gradient">
      <Header onLogout={onLogout} userRole="intake" />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Client Directory
            </h2>
            <p className="text-xl text-muted-foreground">
              Send document upload requests to clients via WhatsApp magic link
            </p>
          </div>

          {success && (
            <div className="client-alert success mb-6">
              <p>{success}</p>
            </div>
          )}

          {error && (
            <div className="client-alert error mb-6">
              <p>{error}</p>
            </div>
          )}

          <div className="client-table-container">
            <table className="client-table">
              <thead>
                <tr>
                  <th className="w-8"></th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Notes</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <React.Fragment key={client.id}>
                    <tr 
                      className={`client-row ${expandedRow === client.id ? 'expanded' : ''}`}
                    >
                      <td>
                        {expandedRow === client.id ? 
                          <ChevronDown className="w-4 h-4" /> : 
                          <ChevronRight className="w-4 h-4" />
                        }
                      </td>
                      <td className="font-medium">{client.name}</td>
                      <td className="client-mobile" style={{height: "66px"}}>
                        <Phone className="h-4 w-4" />
                        <span>{client.mobile}</span>
                      </td>
                      <td>{client.email}</td>
                      <td>
                        <input
                          type="text"
                          value={notes[client.id] || ''}
                          onChange={(e) => handleNotesChange(client.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Add notes..."
                          className="notes-input"
                        />
                      </td>
                      <td className="text-right">
                        <button
                          onClick={(e) => handleSendMagicLink(client, e)}
                          className="client-action-button-sm"
                          disabled={loading === client.id}
                        >
                          {loading === client.id ? (
                            <div className="button-loading">
                              <div className="loading-spinner" />
                              <span>Sending...</span>
                            </div>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Send Link</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === client.id && (
                      <tr className="expanded-content">
                        <td colSpan={8}>
                          <div className="expanded-details">
                            <h4>Additional Information</h4>
                            <p>Click the button to send a WhatsApp message with the document upload link.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};