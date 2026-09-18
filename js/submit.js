/**
 * AIR 5A • Subject PPT Submission Page Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Theme Management (Persistent Dark / Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const THEME_KEY = 'air5a_simple_theme';

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      html.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  initTheme();

  // 2. Submission Modal Controls & Subject Preselection
  const submitModal = document.getElementById('submitModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const subjectSelect = document.getElementById('subjectSelect');
  const selectedSubjectBadgeText = document.getElementById('selectedSubjectBadgeText');
  const googleFormModal = document.getElementById('googleFormModal');
  const closeGFormModalBtn = document.getElementById('closeGFormModalBtn');
  const gFormModalBackdrop = document.getElementById('gFormModalBackdrop');

  function openGoogleFormModal() {
    if (!googleFormModal) return;
    googleFormModal.classList.add('open');
    googleFormModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGoogleFormModal() {
    if (!googleFormModal) return;
    googleFormModal.classList.remove('open');
    googleFormModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeGFormModalBtn) closeGFormModalBtn.addEventListener('click', closeGoogleFormModal);
  if (gFormModalBackdrop) gFormModalBackdrop.addEventListener('click', closeGoogleFormModal);

  function openModal(subjectName, subjectCode) {
    if (subjectCode === 'BTR50113' || (subjectName && subjectName.includes('BTR50113'))) {
      openGoogleFormModal();
      return;
    }
    if (subjectName && subjectSelect) {
      subjectSelect.value = subjectName;
      if (selectedSubjectBadgeText) {
        selectedSubjectBadgeText.textContent = subjectName;
      }
    }
    submitModal.classList.add('open');
    submitModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    submitModal.classList.remove('open');
    submitModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (submitModal && submitModal.classList.contains('open')) {
        closeModal();
      }
      if (googleFormModal && googleFormModal.classList.contains('open')) {
        closeGoogleFormModal();
      }
    }
  });

  if (subjectSelect) {
    subjectSelect.addEventListener('change', (e) => {
      if (e.target.value.includes('BTR50113')) {
        closeModal();
        openGoogleFormModal();
        return;
      }
      if (selectedSubjectBadgeText) {
        selectedSubjectBadgeText.textContent = e.target.value;
      }
    });
  }

  // Hook up subject cards and buttons
  document.querySelectorAll('.btn-submit-subject').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      const subject = btn.getAttribute('data-name');
      openModal(subject, code);
    });
  });

  document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-submit-subject')) return;
      const code = card.getAttribute('data-code');
      const name = card.getAttribute('data-name');
      const full = `${name} (${code})`;
      openModal(full, code);
    });
  });

  // 3. File Dropzone & Validation
  const dropzone = document.getElementById('dropzone');
  const pptFileInput = document.getElementById('pptFileInput');
  const dropzoneEmpty = document.getElementById('dropzoneEmpty');
  const dropzoneFilled = document.getElementById('dropzoneFilled');
  const fileNameDisp = document.getElementById('fileNameDisp');
  const fileSizeDisp = document.getElementById('fileSizeDisp');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const fileError = document.getElementById('fileError');
  const deckTitleInput = document.getElementById('deckTitle');

  let selectedFile = null;

  if (dropzone) {
    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    });

    dropzone.addEventListener('click', (e) => {
      if (e.target === removeFileBtn) return;
      pptFileInput.click();
    });
  }

  if (pptFileInput) {
    pptFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFile(e.target.files[0]);
      }
    });
  }

  function handleFile(file) {
    const valid = ['.pptx', '.ppt', '.pdf'];
    const nameLower = file.name.toLowerCase();
    const isValid = valid.some(ext => nameLower.endsWith(ext));

    if (!isValid) {
      fileError.textContent = 'Please select a valid .pptx, .ppt, or .pdf presentation file.';
      fileError.classList.remove('hidden');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      fileError.textContent = 'File size exceeds the 100MB limit.';
      fileError.classList.remove('hidden');
      return;
    }

    fileError.classList.add('hidden');
    selectedFile = file;

    fileNameDisp.textContent = file.name;
    fileSizeDisp.textContent = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    // Auto-fill title if empty
    if (!deckTitleInput.value.trim()) {
      let cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      cleanName = cleanName.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()));
      deckTitleInput.value = cleanName;
    }

    dropzoneEmpty.classList.add('hidden');
    dropzoneFilled.classList.remove('hidden');
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedFile = null;
      pptFileInput.value = '';
      dropzoneFilled.classList.add('hidden');
      dropzoneEmpty.classList.remove('hidden');
    });
  }

  // 4. Form Submission & Confirmation
  const submissionForm = document.getElementById('submissionForm');
  const formState = document.getElementById('formState');
  const progressState = document.getElementById('progressState');
  const successState = document.getElementById('successState');
  const progressFill = document.getElementById('progressFill');

  const presenterName = document.getElementById('presenterName');
  const presenterId = document.getElementById('presenterId');

  const receiptId = document.getElementById('receiptId');
  const receiptSubject = document.getElementById('receiptSubject');
  const receiptTitle = document.getElementById('receiptTitle');
  const receiptPresenter = document.getElementById('receiptPresenter');

  const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
  const newSubmitBtn = document.getElementById('newSubmitBtn');

  let lastSubmissionData = null;

  if (submissionForm) {
    submissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!selectedFile) {
        fileError.textContent = 'Please choose a presentation file before submitting.';
        fileError.classList.remove('hidden');
        return;
      }

      if (!submissionForm.checkValidity()) {
        submissionForm.reportValidity();
        return;
      }

      const submission = {
        trackingId: `#AIR5A-SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: subjectSelect.value,
        title: deckTitleInput.value.trim(),
        presenter: presenterName.value.trim(),
        id: presenterId.value.trim(),
        file: selectedFile.name,
        date: new Date().toLocaleString()
      };
      lastSubmissionData = submission;

      // Animate progress
      formState.classList.add('hidden');
      progressState.classList.remove('hidden');

      let pct = 0;
      const interval = setInterval(() => {
        pct += 5;
        progressFill.style.width = pct + '%';
        if (pct >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            showSuccess(submission);
          }, 300);
        }
      }, 35);
    });
  }

  function showSuccess(data) {
    progressState.classList.add('hidden');
    successState.classList.remove('hidden');

    receiptId.textContent = data.trackingId;
    receiptSubject.textContent = data.subject;
    receiptTitle.textContent = data.title;
    receiptPresenter.textContent = `${data.presenter} (${data.id})`;
  }

  if (newSubmitBtn) {
    newSubmitBtn.addEventListener('click', () => {
      submissionForm.reset();
      selectedFile = null;
      pptFileInput.value = '';
      dropzoneFilled.classList.add('hidden');
      dropzoneEmpty.classList.remove('hidden');

      successState.classList.add('hidden');
      progressState.classList.add('hidden');
      formState.classList.remove('hidden');
      closeModal();
    });
  }

  if (downloadReceiptBtn) {
    downloadReceiptBtn.addEventListener('click', () => {
      if (!lastSubmissionData) return;
      const data = lastSubmissionData;
      const text = `===========================================
AIR 5A COURSE PPT SUBMISSION RECEIPT
===========================================
Tracking ID : ${data.trackingId}
Date        : ${data.date}
Status      : Verified & Registered

Course      : ${data.subject}
Title       : ${data.title}
Presenter   : ${data.presenter} (ID: ${data.id})
File        : ${data.file}

AIR 5A Academic Committee • Semester V
===========================================`;

      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AIR5A_Receipt_${data.trackingId.replace('#', '')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

});
