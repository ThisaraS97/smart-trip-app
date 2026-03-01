import React, { useState } from 'react';

export default function BulkDataUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'validating', 'success', 'error'
  const [showPreview, setShowPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [validationResults, setValidationResults] = useState(null);

  const templates = [
    {
      id: 'accommodation',
      name: 'Hotel/Accommodation',
      icon: '🏨',
      description: 'Room types, pricing, availability, amenities',
      columns: 'Room Type, Capacity, Price, Meal Plan, Availability'
    },
    {
      id: 'transport',
      name: 'Vehicle/Transport',
      icon: '🚗',
      description: 'Vehicle details, capacity, rental rates',
      columns: 'Vehicle Type, Model, Capacity, Price per Day, Driver Included'
    },
    {
      id: 'guide',
      name: 'Tour Guide',
      icon: '👨‍🏫',
      description: 'Guide profiles, languages, specializations',
      columns: 'Guide Name, Languages, Specialization, Daily Rate, Availability'
    },
    {
      id: 'activity',
      name: 'Activity/Experience',
      icon: '🎭',
      description: 'Tours, activities, packages, pricing',
      columns: 'Activity Name, Duration, Max Participants, Price, Includes'
    },
    {
      id: 'meal',
      name: 'Meal Package',
      icon: '🍽️',
      description: 'Meal plans, menu options, dietary restrictions',
      columns: 'Meal Type, Cuisine, Menu Items, Price per Person, Dietary Options'
    }
  ];

  const [uploadHistory] = useState([
    {
      id: 1,
      date: '2025-02-10 14:30',
      filename: 'room_inventory_feb.xlsx',
      serviceType: 'Accommodation',
      records: 45,
      status: 'success',
      errors: 0
    },
    {
      id: 2,
      date: '2025-02-09 10:15',
      filename: 'activities_kandy.csv',
      serviceType: 'Activities',
      records: 12,
      status: 'success',
      errors: 0
    },
    {
      id: 3,
      date: '2025-02-08 16:45',
      filename: 'transport_fleet.xlsx',
      serviceType: 'Transport',
      records: 8,
      status: 'failed',
      errors: 3
    },
    {
      id: 4,
      date: '2025-02-07 09:20',
      filename: 'meal_packages.csv',
      serviceType: 'Meals',
      records: 20,
      status: 'processing',
      errors: 0
    }
  ]);

  const sampleData = [
    { roomType: 'Deluxe Room', capacity: 2, price: 15000, mealPlan: 'Breakfast', availability: 'Available' },
    { roomType: 'Suite', capacity: 4, price: 25000, mealPlan: 'Half Board', availability: 'Available' },
    { roomType: 'Standard Room', capacity: 2, price: 10000, mealPlan: 'Room Only', availability: 'Limited' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus(null);
    setShowPreview(false);
  };

  const handleUpload = () => {
    setUploadStatus('validating');
    setUploadProgress(0);

    // fake progress for now - TODO: wire up real upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate validation results
          const hasErrors = Math.random() > 0.5;
          setUploadStatus(hasErrors ? 'error' : 'success');
          
          if (hasErrors) {
            setValidationResults({
              totalRows: 45,
              successRows: 42,
              errorRows: 3,
              errors: [
                { row: 5, column: 'Price', type: 'Invalid Format', message: 'Price must be a number', fix: 'Enter numeric value only' },
                { row: 12, column: 'Availability', type: 'Invalid Value', message: 'Must be Available, Limited, or Unavailable', fix: 'Use one of the allowed values' },
                { row: 28, column: 'Room Type', type: 'Missing Required', message: 'Room Type is required', fix: 'Enter a room type' }
              ]
            });
          } else {
            setValidationResults({
              totalRows: 45,
              successRows: 45,
              errorRows: 0,
              errors: []
            });
            setShowPreview(true);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownloadTemplate = (type, format) => {
    alert(`Downloading ${type} template in ${format} format...`);
  };

  const handleConfirmSave = () => {
    alert('Data saved to inventory successfully!');
    handleClearFile();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'green';
      case 'failed': return 'red';
      case 'processing': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      `}</style>

      {/* Header */}
      <div className="bg-slate-900 border border-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Bulk Data Upload</h1>
              <p className="text-slate-400 mt-1">Import your inventory data from Excel or CSV files</p>
            </div>
            <button className="px-4 py-2 text-lime-400 hover:bg-lime-50 rounded-lg font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Upload Guide
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Instructions */}
        <div className="bg-lime-500/10 border border-lime-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-4">📋 Upload Instructions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Step-by-Step Guide:</h3>
              <ol className="space-y-2 text-sm text-lime-300">
                <li>1. Download the appropriate template below</li>
                <li>2. Fill in your data following the column format</li>
                <li>3. Save your file (Excel .xlsx or CSV .csv)</li>
                <li>4. Upload the file using the upload area</li>
                <li>5. Review validation results and fix any errors</li>
                <li>6. Confirm to add data to your inventory</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">File Requirements:</h3>
              <ul className="space-y-2 text-sm text-lime-300">
                <li>✓ Accepted formats: .xlsx, .csv, .xls</li>
                <li>✓ Maximum file size: 5MB</li>
                <li>✓ Include column headers in first row</li>
                <li>✓ Required fields must not be empty</li>
                <li>✓ Dates in format: YYYY-MM-DD</li>
                <li>✓ Prices as numbers without currency symbols</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Template Download Section */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">📥 Download Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <div key={template.id} className="border-2 border-white/10 rounded-lg p-4 hover:border-purple-300 transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{template.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{template.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">{template.description}</p>
                    <p className="text-xs text-slate-500 bg-slate-950 p-2 rounded">
                      Columns: {template.columns}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleDownloadTemplate(template.name, 'Excel')}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Excel
                  </button>
                  <button
                    onClick={() => handleDownloadTemplate(template.name, 'CSV')}
                    className="flex-1 px-3 py-2 border border-white/20 text-slate-300 text-sm rounded-lg hover:bg-slate-950 flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    CSV
                  </button>
                  <button className="px-3 py-2 text-lime-400 hover:bg-lime-50 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload Area */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">📤 Upload File</h2>
          
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive ? 'border-lime-500 bg-lime-50' : 'border-white/20 hover:border-lime-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <>
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <h3 className="text-lg font-semibold text-white mb-2">Drag and drop your file here</h3>
                <p className="text-slate-400 mb-4">or</p>
                <label className="px-6 py-3 bg-lime-500 text-slate-950 rounded-lg font-semibold hover:bg-lime-400 cursor-pointer inline-block">
                  Choose File
                  <input
                    type="file"
                    accept=".xlsx,.csv,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-slate-500 mt-4">Accepts: .xlsx, .csv, .xls (Max 5MB)</p>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <div className="text-left">
                    <p className="font-semibold text-white">{selectedFile.name}</p>
                    <p className="text-sm text-slate-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-lime-500 text-slate-950 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-400">Uploading and validating... {uploadProgress}%</p>
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  {uploadStatus === null && (
                    <>
                      <button
                        onClick={handleClearFile}
                        className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950"
                      >
                        Clear Selection
                      </button>
                      <button
                        onClick={handleUpload}
                        className="px-6 py-2 bg-lime-500 text-slate-950 rounded-lg font-semibold hover:bg-lime-400"
                      >
                        Upload & Validate
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 text-lime-400 rounded" />
              <span className="text-sm text-slate-300">Bulk update existing inventory (replace matching entries)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 text-lime-400 rounded" />
              <span className="text-sm text-slate-300">Set default availability for all items</span>
            </label>
            <button className="text-sm text-lime-400 hover:text-purple-700 font-medium">
              ⚙️ Apply seasonal pricing rules
            </button>
          </div>
        </div>

        {/* Validation Results - Success */}
        {uploadStatus === 'success' && validationResults && (
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Validation Successful!</h2>
                <p className="text-slate-400">All data is valid and ready to import</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-lime-500/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-lime-300">{validationResults.totalRows}</p>
                <p className="text-sm text-slate-400 mt-1">Total Rows</p>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{validationResults.successRows}</p>
                <p className="text-sm text-slate-400 mt-1">Valid Entries</p>
              </div>
              <div className="bg-lime-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-lime-400">{validationResults.successRows}</p>
                <p className="text-sm text-slate-400 mt-1">Will be Added</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-3 bg-lime-500 text-slate-950 rounded-lg font-semibold hover:bg-lime-400"
              >
                Preview Data & Confirm
              </button>
              <button
                onClick={handleClearFile}
                className="px-6 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
              >
                Upload More
              </button>
            </div>
          </div>
        )}

        {/* Validation Results - Errors */}
        {uploadStatus === 'error' && validationResults && (
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Validation Errors Found</h2>
                <p className="text-slate-400">Please fix the errors below and re-upload</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-lime-500/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-lime-300">{validationResults.totalRows}</p>
                <p className="text-sm text-slate-400 mt-1">Total Rows</p>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{validationResults.successRows}</p>
                <p className="text-sm text-slate-400 mt-1">Valid Entries</p>
              </div>
              <div className="bg-red-500/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-red-400">{validationResults.errorRows}</p>
                <p className="text-sm text-slate-400 mt-1">Errors Found</p>
              </div>
            </div>

            <h3 className="font-bold text-white mb-4">Error Details:</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Row</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Column</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Error Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Message</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Suggested Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {validationResults.errors.map((error, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-white">{error.row}</td>
                      <td className="px-4 py-3 text-sm text-white">{error.column}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-100 text-red-300 text-xs rounded-full">
                          {error.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{error.message}</td>
                      <td className="px-4 py-3 text-sm text-lime-400">{error.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
                Download Error Report (Excel)
              </button>
              <button
                onClick={handleClearFile}
                className="px-6 py-3 bg-lime-500 text-slate-950 rounded-lg font-semibold hover:bg-lime-400"
              >
                Fix & Re-upload
              </button>
              <button className="px-6 py-3 border border-green-300 text-green-600 rounded-lg font-semibold hover:bg-green-500/10">
                Skip Errors & Upload Valid Data ({validationResults.successRows} rows)
              </button>
              <button
                onClick={handleClearFile}
                className="px-6 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Data Preview */}
        {showPreview && (
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">📋 Data Preview (First 20 Rows)</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Room Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Capacity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Meal Plan</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sampleData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-white">{row.roomType}</td>
                      <td className="px-4 py-3 text-sm text-white">{row.capacity}</td>
                      <td className="px-4 py-3 text-sm text-white">LKR {row.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-white">{row.mealPlan}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          row.availability === 'Available' ? 'bg-green-100 text-green-300' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {row.availability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmSave}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                ✓ Confirm & Save to Inventory
              </button>
              <button className="px-6 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950">
                Edit Data
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Upload History */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">📜 Upload History</h2>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-white/20 rounded-lg text-sm">
                <option>All Service Types</option>
                <option>Accommodation</option>
                <option>Transport</option>
                <option>Activities</option>
              </select>
              <select className="px-4 py-2 border border-white/20 rounded-lg text-sm">
                <option>All Statuses</option>
                <option>Success</option>
                <option>Failed</option>
                <option>Processing</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Date & Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">File Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Service Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Records</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Errors</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {uploadHistory.map(upload => (
                  <tr key={upload.id}>
                    <td className="px-4 py-3 text-sm text-white">{upload.date}</td>
                    <td className="px-4 py-3 text-sm text-white">{upload.filename}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{upload.serviceType}</td>
                    <td className="px-4 py-3 text-sm text-white font-semibold">{upload.records}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(upload.status)}-100 text-${getStatusColor(upload.status)}-700`}>
                        {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {upload.errors > 0 ? (
                        <span className="text-red-400 font-semibold">{upload.errors}</span>
                      ) : (
                        <span className="text-green-600">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-lime-400 hover:text-purple-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </button>
                        {upload.errors > 0 && (
                          <button className="text-lime-300 hover:text-blue-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                          </button>
                        )}
                        {upload.status === 'failed' && (
                          <button className="text-green-600 hover:text-green-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                          </button>
                        )}
                        <button className="text-red-400 hover:text-red-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}