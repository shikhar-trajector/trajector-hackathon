import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Download, Eye, Calendar } from 'lucide-react';
import { Header } from './Header';
import Loader from './Loader';

interface File {
  filename: string;
  path: string;
  size: number;
  sizeFormatted: string;
  lastModified: string;
  createdAt: string;
}

interface Sender {
  senderName: string;
  path: string;
  fileCount: number;
  files: File[];
  lastModified: string;
  createdAt: string;
}

interface FolderGroup {
  date: string;
  path: string;
  senders: Sender[];
  totalSenders: number;
  totalFiles: number;
}

interface FolderResponse {
  success: boolean;
  message: string;
  documentsPath: string;
  folders: {
    accepted: FolderGroup[];
    rejected: FolderGroup[];
  };
  summary: {
    totalAcceptedFolders: number;
    totalRejectedFolders: number;
    totalFolders: number;
  };
}

interface ClientPortalProps {
  onLogout: () => void;
}

export const ClientPortal = ({ onLogout }: ClientPortalProps) => {
  const [folderData, setFolderData] = useState<FolderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const headers = new Headers({
          'bypass-tunnel-reminder': 'true'
        });

        const response = await fetch('https://silly-oranges-yawn.loca.lt/api/documents/folders', {
          headers: headers
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }
        const data = await response.json();
        setFolderData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (!loading && (error || !folderData)) {
    return <div className="error">Error: {error || 'Failed to load data'}</div>;
  }

  // Calculate status counts
  const statusCounts = {
    approved: folderData?.folders?.accepted?.reduce((acc: number, folder: any) => acc + folder.totalFiles, 0),
    rejected: folderData?.folders?.rejected?.reduce((acc: number, folder: any) => acc + folder.totalFiles, 0),
    processing: 0, // Add these if you have this data
    pending: 0     // Add these if you have this data
  };

  return (
    <div className="client-portal">
      {/* Header */}
      <Header onLogout={onLogout} userRole="client" />

      {/* Main Content */}
      {loading ? <Loader /> : <main className="portal-main">
        <div className="container">
          {/* Dashboard Stats */}
          <div className="stats-section">
            <h2 className="section-title">Document Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <CheckCircle className="stat-icon stat-icon-approved" />
                  <span className="stat-label">Approved</span>
                </div>
                <div className="stat-value">{statusCounts.approved || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <Clock className="stat-icon stat-icon-processing" />
                  <span className="stat-label">Processing</span>
                </div>
                <div className="stat-value">{statusCounts.processing || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <AlertCircle className="stat-icon stat-icon-pending" />
                  <span className="stat-label">Pending</span>
                </div>
                <div className="stat-value">{statusCounts.pending || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <AlertCircle className="stat-icon stat-icon-rejected" />
                  <span className="stat-label">Rejected</span>
                </div>
                <div className="stat-value">{statusCounts.rejected || 0}</div>
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="documents-section">
            <h2 className="section-title">Your Documents</h2>
            <div className="documents-table-container">
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Sender</th>
                    <th>Status</th>
                    <th>Size</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {folderData?.folders?.accepted?.map((folder: any) => 
                    folder.senders.map((sender: any) =>
                      sender.files.map((file: any) => (
                        <tr key={file.path} className="document-row">
                          <td>
                            <div className="document-info">
                              <FileText className="document-icon" />
                              <div>
                                <div className="document-name">{file.filename}</div>
                                <div className="document-size">{file.sizeFormatted}</div>
                              </div>
                            </div>
                          </td>
                          <td>{sender.senderName}</td>
                          <td>
                            <div className="status-badge status-approved">
                              <CheckCircle className="status-icon" />
                              <span className="status-text">Accepted</span>
                            </div>
                          </td>
                          <td>{file.sizeFormatted}</td>
                          <td className="document-date">
                            <div className="date-info">
                              <Calendar className="date-icon" />
                              {new Date(file.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="action-button view-button" title="View Document">
                                <Eye className="action-icon" />
                              </button>
                              <button className="action-button download-button" title="Download Document">
                                <Download className="action-icon" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )
                  )}
                  {folderData?.folders?.rejected?.map((folder: any) => 
                    folder.senders.map((sender: any) =>
                      sender.files.map((file: any) => (
                        <tr key={file.path} className="document-row">
                          <td>
                            <div className="document-info">
                              <FileText className="document-icon" />
                              <div>
                                <div className="document-name">{file.filename}</div>
                                <div className="document-size">{file.sizeFormatted}</div>
                              </div>
                            </div>
                          </td>
                          <td>{sender.senderName}</td>
                          <td>
                            <div className="status-badge status-rejected">
                              <AlertCircle className="status-icon" />
                              <span className="status-text">Rejected</span>
                            </div>
                          </td>
                          <td>{file.sizeFormatted}</td>
                          <td className="document-date">
                            <div className="date-info">
                              <Calendar className="date-icon" />
                              {new Date(file.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="action-button view-button" title="View Document">
                                <Eye className="action-icon" />
                              </button>
                              <button className="action-button download-button" title="Download Document">
                                <Download className="action-icon" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>}
    </div>
  );
};