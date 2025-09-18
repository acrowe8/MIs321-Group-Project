// Storage keys
const STORAGE_NOTES_KEY = "notes:data";
const STORAGE_USER_ID_KEY = "notes:userId";
const STORAGE_USERS_KEY = "notes:users";
const STORAGE_SESSION_USER_ID_KEY = "notes:sessionUserId";
const STORAGE_COMMENTS_KEY = "notes:comments";

// Performance optimization
let lastRenderHash = null;

// Utilities
function generateId() {
	return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getOrCreateUserId() {
	let id = localStorage.getItem(STORAGE_USER_ID_KEY);
	if (!id) {
		id = generateId();
		localStorage.setItem(STORAGE_USER_ID_KEY, id);
	}
	return id;
}

// Auth utilities (simple localStorage-based)
function loadUsers() {
	try {
		const raw = localStorage.getItem(STORAGE_USERS_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch (e) {
		console.error("Failed to parse users from storage", e);
		return [];
	}
}

function saveUsers(users) {
	localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

function loadComments() {
	try {
		const raw = localStorage.getItem(STORAGE_COMMENTS_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch (e) {
		console.error("Failed to parse comments from storage", e);
		return [];
	}
}

function saveComments(comments) {
	localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(comments));
}

function getCurrentUser() {
	const id = localStorage.getItem(STORAGE_SESSION_USER_ID_KEY);
	if (!id) return null;
	return loadUsers().find((u) => u.id === id) || null;
}

function setCurrentUserId(id) {
	if (id) localStorage.setItem(STORAGE_SESSION_USER_ID_KEY, id);
	else localStorage.removeItem(STORAGE_SESSION_USER_ID_KEY);
}

function simpleHash(input) {
	try {
		return btoa(unescape(encodeURIComponent(input)));
	} catch {
		return input;
	}
}

function signupUser(firstName, lastName, cwid, email, password) {
	const users = loadUsers();
	const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
	if (exists) return { ok: false, error: "Email already registered" };
	if (users.some((u) => (u.cwid || "").toLowerCase() === cwid.toLowerCase())) {
		return { ok: false, error: "CWID already registered" };
	}
	const user = {
		id: generateId(),
		name: `${firstName.trim()} ${lastName.trim()}`.trim(),
		firstName: firstName.trim(),
		lastName: lastName.trim(),
		cwid: cwid.trim(),
		email: email.trim(),
		passwordHash: simpleHash(password),
	};
	users.push(user);
	saveUsers(users);
	setCurrentUserId(user.id);
	return { ok: true, user };
}

function loginUser(email, password) {
	const users = loadUsers();
	const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
	if (!user) return { ok: false, error: "Invalid credentials" };
	if (user.passwordHash !== simpleHash(password)) return { ok: false, error: "Invalid credentials" };
	setCurrentUserId(user.id);
	return { ok: true, user };
}

function loadNotes() {
	try {
		const raw = localStorage.getItem(STORAGE_NOTES_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch (e) {
		console.error("Failed to parse notes from storage", e);
		return [];
	}
}

function saveNotes(notes) {
	localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
}

function calculateAverageRating(ratings) {
	if (!ratings || ratings.length === 0) return 0;
	const sum = ratings.reduce((acc, r) => acc + r.value, 0);
	return Math.round((sum / ratings.length) * 10) / 10; // one decimal
}

function hasUserRated(note, userId) {
	return (note.ratings || []).some((r) => r.userId === userId);
}

// DOM helpers
function el(tag, className, html) {
	const node = document.createElement(tag);
	if (className) node.className = className;
	if (html !== undefined) node.innerHTML = html;
	return node;
}

function renderStars(avg) {
	const full = Math.floor(avg);
	const half = avg - full >= 0.5;
	const empty = 5 - full - (half ? 1 : 0);
	let html = "";
	for (let i = 0; i < full; i++) html += "★";
	if (half) html += "☆"; // simple half-like marker (no half star in pure text)
	for (let i = 0; i < empty; i++) html += "☆";
	return `<span class="star" aria-label="Average rating ${avg} out of 5">${html}</span>`;
}

// Validation helpers
function isValidEmail(email) {
	// Basic RFC 5322-inspired check suitable for client-side validation
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

function isValidPassword(password) {
	// At least 8 chars, includes at least one letter and one number
	if (!password || password.length < 8) return false;
	const hasLetter = /[A-Za-z]/.test(password);
	const hasNumber = /[0-9]/.test(password);
	return hasLetter && hasNumber;
}

// App state
let notes = [];
const userId = getOrCreateUserId();

// Elements
const notesListEl = document.getElementById("notesList");
const resultsCountEl = document.getElementById("resultsCount");
const listViewEl = document.getElementById("listView");
const detailViewEl = document.getElementById("detailView");
const noteDetailEl = document.getElementById("noteDetail");
const backToListBtn = document.getElementById("backToListBtn");
const profileViewEl = document.getElementById("profileView");
const profileNotesEl = document.getElementById("profileNotes");
const backToListFromProfileBtn = document.getElementById("backToListFromProfileBtn");
const addNoteViewEl = document.getElementById("addNoteView");
const backToListFromAddBtn = document.getElementById("backToListFromAddBtn");
const addNotePageForm = document.getElementById("addNotePageForm");
const addNotePageFiles = document.getElementById("addNotePageFiles");
const fileListEl = document.getElementById("fileList");
const cancelAddNotePageBtn = document.getElementById("cancelAddNotePage");
const addNoteNavBtn = document.getElementById("addNoteNavBtn");
const brandHomeLink = document.getElementById("brandHomeLink");
const adminBtn = document.getElementById("adminBtn");
const changePwBtn = document.getElementById("changePwBtn");
const profileBtn = document.getElementById("profileBtn");

// Auth elements
const authStatusEl = document.getElementById("authStatus");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authModalEl = document.getElementById("authModal");
const authModalTitleEl = document.getElementById("authModalTitle");
const authForm = document.getElementById("authForm");
const signupExtraEl = document.getElementById("signupExtra");
const authFirstNameInput = document.getElementById("authFirstName");
const authLastNameInput = document.getElementById("authLastName");
const authCWIDInput = document.getElementById("authCWID");
const authEmailInput = document.getElementById("authEmail");
const authPasswordInput = document.getElementById("authPassword");
const authMsgEl = document.getElementById("authMsg");
const switchAuthModeBtn = document.getElementById("switchAuthModeBtn");
const authSubmitBtn = document.getElementById("authSubmitBtn");
// Admin modal elements
const adminModalEl = document.getElementById("adminModal");
const adminNotesListEl = document.getElementById("adminNotesList");
const adminUsersListEl = document.getElementById("adminUsersList");
const adminNotesSearchEl = document.getElementById("adminNotesSearch");
const adminUsersSearchEl = document.getElementById("adminUsersSearch");
const seedNotesBtn = document.getElementById("seedNotesBtn");
// Change password elements
const changePwModalEl = document.getElementById("changePwModal");
const changePwForm = document.getElementById("changePwForm");
const currentPwInput = document.getElementById("currentPw");
const newPwInput = document.getElementById("newPw");
const newPw2Input = document.getElementById("newPw2");
const changePwMsgEl = document.getElementById("changePwMsg");
const changePwSubmitBtn = document.getElementById("changePwSubmit");
// Edit note elements
const editNoteModalEl = document.getElementById("editNoteModal");
const editNoteForm = document.getElementById("editNoteForm");
const editNoteId = document.getElementById("editNoteId");
const editNoteTitle = document.getElementById("editNoteTitle");
const editNoteClass = document.getElementById("editNoteClass");
const editNoteYear = document.getElementById("editNoteYear");
const editNoteTopic = document.getElementById("editNoteTopic");
const editNoteContent = document.getElementById("editNoteContent");


const filterInputs = {
	title: document.getElementById("filterTitle"),
	author: document.getElementById("filterAuthor"),
	className: document.getElementById("filterClass"),
	year: document.getElementById("filterYear"),
	topic: document.getElementById("filterTopic"),
};

const clearFiltersBtn = document.getElementById("clearFiltersBtn");

// Initialization
function init() {
	notes = loadNotes();
	bindEvents();
	populateYearDropdowns();
	updateAuthUI();
	renderList();
}

function bindEvents() {
	// Filters
	Object.values(filterInputs).forEach((input) => {
		input.addEventListener("input", () => renderList());
		input.addEventListener("change", () => renderList());
	});
	clearFiltersBtn.addEventListener("click", () => {
		Object.values(filterInputs).forEach((i) => (i.value = ""));
		renderList();
	});



	backToListBtn.addEventListener("click", () => {
		showListView();
	});

	brandHomeLink.addEventListener("click", (e) => {
		e.preventDefault();
		showListView();
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	profileBtn?.addEventListener("click", () => showProfileView());
	backToListFromProfileBtn?.addEventListener("click", () => showListView());
	addNoteNavBtn?.addEventListener("click", () => {
		const user = getCurrentUser();
		if (!user) {
			openAuthModal("login", "Please log in to add notes.");
			return;
		}
		showAddNoteView();
	});
	backToListFromAddBtn?.addEventListener("click", () => showListView());
	cancelAddNotePageBtn?.addEventListener("click", () => showListView());
	
	// Add Note page form submission
	addNotePageForm?.addEventListener("submit", (e) => {
		e.preventDefault();
		submitAddNotePage();
	});
	
	// File upload handling
	addNotePageFiles?.addEventListener("change", handleFileUpload);

	// Auth handlers
	loginBtn.addEventListener("click", () => openAuthModal("login"));
	
	// Enter key support for auth form
	authEmailInput?.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitAuth();
		}
	});
	
	authPasswordInput?.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitAuth();
		}
	});
	
	// Enter key support for signup form fields
	authFirstNameInput?.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitAuth();
		}
	});
	
	authLastNameInput?.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitAuth();
		}
	});
	
	authCWIDInput?.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitAuth();
		}
	});
	logoutBtn.addEventListener("click", () => {
		if (!confirm("Are you sure you want to log out?")) {
			return;
		}
		setCurrentUserId(null);
		updateAuthUI();
		// Clear auth inputs
		if (authEmailInput) authEmailInput.value = "";
		if (authPasswordInput) authPasswordInput.value = "";
		if (authFirstNameInput) authFirstNameInput.value = "";
		if (authLastNameInput) authLastNameInput.value = "";
		if (authCWIDInput) authCWIDInput.value = "";
		if (authMsgEl) authMsgEl.textContent = "";
		showListView();
		renderList();
	});
	switchAuthModeBtn.addEventListener("click", () => toggleAuthMode());
	authSubmitBtn.addEventListener("click", () => submitAuth());
	changePwSubmitBtn?.addEventListener("click", () => submitPasswordChange());

	// Admin handlers
	adminModalEl?.addEventListener("show.bs.modal", () => renderAdmin());
	if (adminNotesSearchEl) adminNotesSearchEl.addEventListener("input", renderAdmin);
	if (adminUsersSearchEl) adminUsersSearchEl.addEventListener("input", renderAdmin);
seedNotesBtn?.addEventListener("click", () => {
	if (!confirm("Generate 100 dummy notes? This will append to existing notes.")) return;
	generateDummyNotes(100);
	renderAdmin();
	renderList();
});

	// Edit note submit
	editNoteForm?.addEventListener("submit", (e) => {
		e.preventDefault();
		const currentUser = getCurrentUser();
		if (!currentUser) return;
		const id = editNoteId.value;
		const note = notes.find((n) => n.id === id);
		if (!note) return;
		if (note.authorUserId !== currentUser.id && !isAdmin(currentUser)) return;
		note.title = editNoteTitle.value.trim();
		note.className = editNoteClass.value.trim();
		note.year = Number(editNoteYear.value);
		note.topic = editNoteTopic.value.trim();
		note.content = editNoteContent.value.trim();
		saveNotes(notes);
		bootstrap.Modal.getOrCreateInstance(editNoteModalEl).hide();
		showDetailView(note.id);
	});
}

function getActiveFilters() {
	return {
		title: filterInputs.title.value.trim().toLowerCase(),
		author: filterInputs.author.value.trim().toLowerCase(),
		className: filterInputs.className.value.trim().toLowerCase(),
		year: filterInputs.year.value.trim(),
		topic: filterInputs.topic.value.trim().toLowerCase(),
	};
}

function applyFilters(data) {
	const f = getActiveFilters();
	return data.filter((n) => {
		const matchTitle = f.title ? n.title.toLowerCase().includes(f.title) : true;
		const matchAuthor = f.author ? n.author.toLowerCase().includes(f.author) : true;
		const matchClass = f.className ? n.className.toLowerCase().includes(f.className) : true;
		const matchYear = f.year ? String(n.year) === String(f.year) : true;
		const matchTopic = f.topic ? n.topic.toLowerCase().includes(f.topic) : true;
		return matchTitle && matchAuthor && matchClass && matchYear && matchTopic;
	});
}

function renderList(forceRefresh = false) {
	const filtered = applyFilters(notes)
		.slice()
		.sort((a, b) => {
			const aCount = (a.ratings || []).length;
			const bCount = (b.ratings || []).length;
			if (bCount !== aCount) return bCount - aCount; // more ratings first
			const aAvg = calculateAverageRating(a.ratings || []);
			const bAvg = calculateAverageRating(b.ratings || []);
			if (bAvg !== aAvg) return bAvg - aAvg; // higher average first (5 -> 0)
			return (b.createdAt || 0) - (a.createdAt || 0); // newest last tiebreaker
		});
	
	// Create a simple hash to check if data has changed
	const currentHash = JSON.stringify(filtered.map(n => ({ id: n.id, title: n.title, ratings: n.ratings })));
	
	// Skip rendering if data hasn't changed and not forced
	if (!forceRefresh && lastRenderHash === currentHash) {
		return;
	}
	
	lastRenderHash = currentHash;
	resultsCountEl.textContent = `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`;
	
	// Use DocumentFragment for better performance
	const fragment = document.createDocumentFragment();
	
	if (filtered.length === 0) {
		const emptyDiv = document.createElement('div');
		emptyDiv.className = 'col-12 text-secondary';
		emptyDiv.textContent = 'No notes yet. Add one!';
		fragment.appendChild(emptyDiv);
	} else {
		filtered.forEach((note) => {
			const avg = calculateAverageRating(note.ratings);
			const col = el("div", "col-12 col-md-6");
			const card = el("div", "card h-100 note-card cursor-pointer");
			card.addEventListener("click", () => showDetailView(note.id));
			const body = el(
				"div",
				"card-body",
				`<div class="d-flex justify-content-between align-items-start">
					<h3 class="h5">${escapeHtml(note.title)}</h3>
					<div class="ms-2 small text-nowrap">${renderStars(avg)}</div>
				</div>
				<p class="mb-1 text-secondary small">By ${escapeHtml(note.author)} · ${escapeHtml(note.className)} · ${escapeHtml(String(note.year))} · ${escapeHtml(note.topic)}</p>
				<p class="mb-0 text-truncate-2">${escapeMultilineToHtml(note.content)}</p>`
			);
			card.appendChild(body);
			col.appendChild(card);
			fragment.appendChild(col);
		});
	}
	
	// Single DOM update for better performance
	notesListEl.innerHTML = "";
	notesListEl.appendChild(fragment);
}

function showListView(forceRefresh = false) {
	listViewEl.classList.remove("d-none");
	detailViewEl.classList.add("d-none");
	profileViewEl?.classList.add("d-none");
	addNoteViewEl?.classList.add("d-none");
	
	// Only refresh the list if forced or if it's empty
	if (forceRefresh || notesListEl.children.length === 0) {
		renderList(forceRefresh);
	}
	
	// Collapse hamburger menu
	collapseHamburgerMenu();
}

function showDetailView(noteId) {
	const note = notes.find((n) => n.id === noteId);
	if (!note) return;
	const avg = calculateAverageRating(note.ratings);
	const raterCount = note.ratings.length;
	const currentUser = getCurrentUser();
	const canEdit = currentUser && (note.authorUserId === currentUser.id || isAdmin(currentUser));
	// Load comments for this note
	const comments = loadComments().filter(c => c.noteId === noteId);
	const commentsHtml = renderComments(comments, noteId);
	
	noteDetailEl.innerHTML = `
		<div class="card">
			<div class="card-body">
				<h2 class="h4 mb-1">${escapeHtml(note.title)}</h2>
				<p class="text-secondary mb-2">By ${escapeHtml(note.author)} · ${escapeHtml(note.className)} · ${escapeHtml(String(note.year))} · ${escapeHtml(note.topic)}</p>
				<div class="d-flex align-items-center gap-2 mb-3">
					<div>${renderStars(avg)}</div>
					<div class="small text-secondary">(${raterCount} rating${raterCount !== 1 ? "s" : ""})</div>
				</div>
				${canEdit ? '<div class="mb-3"><button id="editNoteBtn" class="btn btn-sm btn-outline-primary">Edit Note</button> <button id="deleteNoteBtn" class="btn btn-sm btn-outline-danger">Delete Note</button></div>' : ''}
				<div class="mb-3">${escapeMultilineToHtml(note.content)}</div>
				${note.attachments && note.attachments.length > 0 ? `
					<div class="mb-3">
						<h6>Attachments:</h6>
						<div>
							${note.attachments.map(attachment => {
								const isImage = attachment.type && attachment.type.startsWith('image/');
								if (isImage) {
									// Image attachment - show full size with click to enlarge
									return `
										<div class="mb-3">
											<div class="d-flex justify-content-between align-items-center mb-2">
												<div>
													<strong>${escapeHtml(attachment.name)}</strong>
													<small class="text-muted d-block">${(attachment.size / 1024 / 1024).toFixed(2)} MB</small>
												</div>
											</div>
											<img src="${attachment.url}" 
												 alt="${escapeHtml(attachment.name)}" 
												 class="img-fluid rounded border" 
												 style="cursor: pointer; max-height: 400px; object-fit: contain;"
												 onclick="openImageModal('${attachment.url}', '${escapeHtml(attachment.name)}')">
										</div>
									`;
								} else {
									// Document attachment - show button to view text
									return `
										<div class="list-group-item d-flex justify-content-between align-items-center mb-2">
											<div class="d-flex align-items-center">
												<div>
													<strong>${escapeHtml(attachment.name)}</strong>
													<small class="text-muted d-block">${(attachment.size / 1024 / 1024).toFixed(2)} MB</small>
												</div>
											</div>
											<button class="btn btn-sm btn-outline-primary" onclick="viewDocument('${attachment.id}')">
												View Text
											</button>
										</div>
									`;
								}
							}).join('')}
						</div>
					</div>
				` : ''}
				<div>
					<label class="form-label">Your Rating</label>
					<div class="d-flex align-items-center gap-2">
						<div class="btn-group" role="group" aria-label="Rate this note">
							${[1,2,3,4,5]
								.map((v) => `<input type="radio" class="btn-check" name="rating" id="rate${v}" value="${v}" autocomplete="off">
								<label class="btn btn-outline-primary" for="rate${v}">${v}</label>`)
								.join("")}
						</div>
						<button id="submitRatingBtn" class="btn btn-primary">Submit</button>
						<div id="ratingMsg" class="small text-secondary"></div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Comments Section -->
		<div class="card mt-3">
			<div class="card-header">
				<h5 class="mb-0">Comments (${comments.length})</h5>
			</div>
			<div class="card-body">
				${currentUser ? `
					<div class="mb-3">
						<label for="newComment" class="form-label">Add a comment</label>
						<textarea id="newComment" class="form-control" rows="3" placeholder="Write your comment here..."></textarea>
						<button id="submitCommentBtn" class="btn btn-primary mt-2">Post Comment</button>
					</div>
				` : '<p class="text-muted">Please log in to add comments.</p>'}
				
				<div id="commentsList">
					${commentsHtml}
				</div>
			</div>
		</div>
	`;

	const submitBtn = document.getElementById("submitRatingBtn");
	const msgEl = document.getElementById("ratingMsg");
	const editBtn = document.getElementById("editNoteBtn");
	const deleteBtn = document.getElementById("deleteNoteBtn");

	if (!currentUser) {
		msgEl.textContent = "Log in to rate this note.";
		submitBtn.disabled = true;
	} else if (note.authorUserId && note.authorUserId === currentUser.id) {
		msgEl.textContent = "Authors cannot rate their own note.";
		submitBtn.disabled = true;
	} else if (hasUserRated(note, currentUser.id)) {
		msgEl.textContent = "You have already rated this note.";
		submitBtn.disabled = true;
	}

	submitBtn.addEventListener("click", () => {
		const user = getCurrentUser();
		if (!user) return;
		if (note.authorUserId && note.authorUserId === user.id) return;
		if (hasUserRated(note, user.id)) return;
		const selected = document.querySelector('input[name="rating"]:checked');
		if (!selected) {
			msgEl.textContent = "Select 1-5 to rate.";
			return;
		}
		const value = Number(selected.value);
		note.ratings.push({ userId: user.id, value, at: Date.now() });
		saveNotes(notes);
		showDetailView(note.id); // rerender
	});

	if (editBtn) {
		editBtn.addEventListener("click", () => openEditNote(note));
	}
	if (deleteBtn) {
		deleteBtn.addEventListener("click", () => {
			const current = getCurrentUser();
			if (!current) return;
			if (note.authorUserId !== current.id && !isAdmin(current)) return;
			if (!confirm("Delete this note? This action cannot be undone.")) return;
			deleteNote(note.id);
			showListView();
			renderList();
		});
	}

	// Comment functionality
	const submitCommentBtn = document.getElementById("submitCommentBtn");
	if (submitCommentBtn) {
		submitCommentBtn.addEventListener("click", () => {
			const user = getCurrentUser();
			if (!user) return;
			
			const commentText = document.getElementById("newComment").value.trim();
			if (!commentText) {
				alert("Please enter a comment.");
				return;
			}
			
			const comments = loadComments();
			const newComment = {
				id: generateId(),
				noteId: noteId,
				authorUserId: user.id,
				authorName: user.firstName + " " + user.lastName,
				content: commentText,
				createdAt: Date.now()
			};
			
			comments.push(newComment);
			saveComments(comments);
			
			// Clear the textarea and refresh the view
			document.getElementById("newComment").value = "";
			showDetailView(noteId);
		});
	}

	// Add event listeners for comment actions
	setTimeout(() => {
		// Edit comment buttons
		document.querySelectorAll('.edit-comment-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const commentId = e.target.dataset.commentId;
				const commentDiv = document.querySelector(`[data-comment-id="${commentId}"]`);
				const contentDiv = commentDiv.querySelector('.comment-content');
				const editForm = commentDiv.querySelector('.edit-comment-form');
				
				contentDiv.classList.add('d-none');
				editForm.classList.remove('d-none');
			});
		});

		// Cancel edit buttons
		document.querySelectorAll('.cancel-edit-comment-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const commentId = e.target.dataset.commentId;
				const commentDiv = document.querySelector(`[data-comment-id="${commentId}"]`);
				const contentDiv = commentDiv.querySelector('.comment-content');
				const editForm = commentDiv.querySelector('.edit-comment-form');
				
				contentDiv.classList.remove('d-none');
				editForm.classList.add('d-none');
			});
		});

		// Save comment buttons
		document.querySelectorAll('.save-comment-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const commentId = e.target.dataset.commentId;
				const commentDiv = document.querySelector(`[data-comment-id="${commentId}"]`);
				const textarea = commentDiv.querySelector('.edit-comment-form textarea');
				const newContent = textarea.value.trim();
				
				if (!newContent) {
					alert("Comment cannot be empty.");
					return;
				}
				
				const comments = loadComments();
				const comment = comments.find(c => c.id === commentId);
				if (comment) {
					comment.content = newContent;
					saveComments(comments);
					showDetailView(noteId);
				}
			});
		});

		// Delete comment buttons
		document.querySelectorAll('.delete-comment-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const commentId = e.target.dataset.commentId;
				
				if (!confirm("Delete this comment? This action cannot be undone.")) {
					return;
				}
				
				const comments = loadComments();
				const updatedComments = comments.filter(c => c.id !== commentId);
				saveComments(updatedComments);
				showDetailView(noteId);
			});
		});
	}, 100);

	listViewEl.classList.add("d-none");
	detailViewEl.classList.remove("d-none");
	// Collapse hamburger menu
	collapseHamburgerMenu();
}

function renderComments(comments, noteId) {
	if (comments.length === 0) {
		return '<p class="text-muted">No comments yet. Be the first to comment!</p>';
	}
	
	const currentUser = getCurrentUser();
	const users = loadUsers();
	
	return comments
		.sort((a, b) => a.createdAt - b.createdAt) // Sort by creation time (oldest first)
		.map(comment => {
			const canEdit = currentUser && comment.authorUserId === currentUser.id;
			const canDelete = currentUser && (
				comment.authorUserId === currentUser.id || 
				isAdmin(currentUser) ||
				notes.find(n => n.id === noteId)?.authorUserId === currentUser.id
			);
			
			return `
				<div class="border-bottom pb-3 mb-3" data-comment-id="${comment.id}">
					<div class="d-flex justify-content-between align-items-start">
						<div class="flex-grow-1">
							<h6 class="mb-1">${escapeHtml(comment.authorName)}</h6>
							<small class="text-muted">${new Date(comment.createdAt).toLocaleString()}</small>
						</div>
						${canEdit || canDelete ? `
							<div class="btn-group btn-group-sm">
								${canEdit ? `<button class="btn btn-outline-primary btn-sm edit-comment-btn" data-comment-id="${comment.id}">Edit</button>` : ''}
								${canDelete ? `<button class="btn btn-outline-danger btn-sm delete-comment-btn" data-comment-id="${comment.id}">Delete</button>` : ''}
							</div>
						` : ''}
					</div>
					<div class="mt-2">
						<div class="comment-content">${escapeMultilineToHtml(comment.content)}</div>
						${canEdit ? `
							<div class="edit-comment-form d-none mt-2">
								<textarea class="form-control" rows="2">${escapeHtml(comment.content)}</textarea>
								<div class="mt-2">
									<button class="btn btn-primary btn-sm save-comment-btn" data-comment-id="${comment.id}">Save</button>
									<button class="btn btn-secondary btn-sm cancel-edit-comment-btn" data-comment-id="${comment.id}">Cancel</button>
								</div>
							</div>
						` : ''}
					</div>
				</div>
			`;
		}).join('');
}

// Simple escaping helpers
function escapeHtml(str) {
	return str
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}

function escapeMultilineToHtml(str) {
	return escapeHtml(str).replaceAll("\n", "<br>");
}

// Utility class for truncation in list cards
const style = document.createElement("style");
style.textContent = `.text-truncate-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}`;
document.head.appendChild(style);

// Boot
document.addEventListener("DOMContentLoaded", init);

// Populate year dropdowns (2018..current)
function populateYearDropdowns() {
	const start = 2018;
	const current = new Date().getFullYear();
	const years = [];
	for (let y = current; y >= start; y--) years.push(y);
	const filterYearEl = document.getElementById("filterYear");
	filterYearEl.innerHTML = `<option value="">All</option>` + years.map((y) => `<option value="${y}">${y}</option>`).join("");
	
	// Populate Add Note page year dropdown
	const addNotePageYearEl = document.getElementById("addNotePageYear");
	if (addNotePageYearEl) {
		addNotePageYearEl.innerHTML = `<option value="">Select year</option>` + years.map((y) => `<option value="${y}">${y}</option>`).join("");
	}
	
	// Populate Edit Note modal year dropdown
	const editYearEl = document.getElementById("editNoteYear");
	if (editYearEl) editYearEl.innerHTML = years.map((y) => `<option value="${y}">${y}</option>`).join("");
}

// Auth UI logic
let authMode = "login"; // or "signup"

function toggleAuthMode() {
	authMode = authMode === "login" ? "signup" : "login";
	refreshAuthModalMode();
}

function refreshAuthModalMode() {
	authModalTitleEl.textContent = authMode === "login" ? "Log in" : "Sign up";
	authSubmitBtn.textContent = authMode === "login" ? "Log in" : "Create account";
	switchAuthModeBtn.textContent = authMode === "login" ? "Create an account" : "Have an account? Log in";
	if (signupExtraEl) signupExtraEl.style.display = authMode === "login" ? "none" : "flex";
	authMsgEl.textContent = "";
}

function openAuthModal(mode = "login", message) {
	authMode = mode;
	refreshAuthModalMode();
	if (message) {
		authMsgEl.classList.remove("text-danger");
		authMsgEl.classList.add("text-secondary");
		authMsgEl.textContent = message;
	}
	const modal = bootstrap.Modal.getOrCreateInstance(authModalEl);
	modal.show();
}

function submitAuth() {
	const email = authEmailInput.value.trim();
	const password = authPasswordInput.value;
	if (!email || !password) {
		authMsgEl.classList.remove("text-secondary");
		authMsgEl.classList.add("text-danger");
		authMsgEl.textContent = "Email and password are required.";
		return;
	}
	if (!isValidEmail(email)) {
		authMsgEl.classList.remove("text-secondary");
		authMsgEl.classList.add("text-danger");
		authMsgEl.textContent = "Please enter a valid email address.";
		return;
	}
	if (authMode === "signup") {
		const firstName = authFirstNameInput.value.trim();
		const lastName = authLastNameInput.value.trim();
		const cwid = authCWIDInput.value.trim();
		if (!firstName || !lastName) {
			authMsgEl.classList.add("text-danger");
			authMsgEl.textContent = "First and last name are required.";
			return;
		}
		if (!cwid) {
			authMsgEl.classList.add("text-danger");
			authMsgEl.textContent = "CWID is required.";
			return;
		}
		if (!/^[0-9]{4,12}$/.test(cwid)) {
			authMsgEl.classList.add("text-danger");
			authMsgEl.textContent = "CWID must be 4-12 digits.";
			return;
		}
		if (!isValidPassword(password)) {
			authMsgEl.classList.remove("text-secondary");
			authMsgEl.classList.add("text-danger");
			authMsgEl.textContent = "Password must be at least 8 characters and include letters and numbers.";
			return;
		}
		const res = signupUser(firstName, lastName, cwid, email, password);
		if (!res.ok) {
			authMsgEl.classList.add("text-danger");
			authMsgEl.textContent = res.error;
			return;
		}
	} else {
		const res = loginUser(email, password);
		if (!res.ok) {
			authMsgEl.classList.add("text-danger");
			authMsgEl.textContent = res.error;
			return;
		}
	}
	const modal = bootstrap.Modal.getOrCreateInstance(authModalEl);
	modal.hide();
	updateAuthUI();
	// Clear form fields after success
	if (authEmailInput) authEmailInput.value = "";
	if (authPasswordInput) authPasswordInput.value = "";
	if (authFirstNameInput) authFirstNameInput.value = "";
	if (authLastNameInput) authLastNameInput.value = "";
	if (authCWIDInput) authCWIDInput.value = "";
	if (authMsgEl) authMsgEl.textContent = "";
	showListView();
	renderList();
}

function updateAuthUI() {
	const user = getCurrentUser();
	if (user) {
		authStatusEl.classList.remove("d-none");
		authStatusEl.textContent = `Signed in as ${user.name}`;
		loginBtn.classList.add("d-none");
		logoutBtn.classList.remove("d-none");
		changePwBtn?.classList.remove("d-none");
		adminBtn.classList.toggle("d-none", !isAdmin(user));
		profileBtn?.classList.remove("d-none");
	} else {
		authStatusEl.classList.add("d-none");
		authStatusEl.textContent = "";
		loginBtn.classList.remove("d-none");
		logoutBtn.classList.add("d-none");
		adminBtn.classList.add("d-none");
		changePwBtn?.classList.add("d-none");
		profileBtn?.classList.add("d-none");
		const authorInput = document.getElementById("noteAuthor");
		authorInput.value = "";
	}
}

// Admin helpers
const ADMIN_EMAILS = [
	// Add admin emails here, e.g. "admin@example.com"
    "hlhoang@crimson.ua.edu"
];

function isAdmin(user) {
	if (!user) return false;
	return ADMIN_EMAILS.some((e) => e.toLowerCase() === user.email.toLowerCase());
}

function deleteNote(noteId) {
	const idx = notes.findIndex((n) => n.id === noteId);
	if (idx >= 0) {
		notes.splice(idx, 1);
		saveNotes(notes);
	}
}

function deleteUser(userId) {
	const users = loadUsers();
	const idx = users.findIndex((u) => u.id === userId);
	if (idx >= 0) {
		users.splice(idx, 1);
		saveUsers(users);
		// Remove their session if currently logged in
		const current = getCurrentUser();
		if (current && current.id === userId) setCurrentUserId(null);
		// Optionally, anonymize their notes (keep content, mark author)
		notes = notes.map((n) => (n.authorUserId === userId ? { ...n, author: "[deleted]", authorUserId: null } : n));
		saveNotes(notes);
	}
}

function resetUserPassword(userId, newPassword) {
	const users = loadUsers();
	const user = users.find((u) => u.id === userId);
	if (!user) return false;
	user.passwordHash = simpleHash(newPassword);
	saveUsers(users);
	return true;
}

function submitPasswordChange() {
	const user = getCurrentUser();
	if (!user) return;
	const currentPw = currentPwInput?.value || "";
	const newPw = newPwInput?.value || "";
	const newPw2 = newPw2Input?.value || "";
	changePwMsgEl.textContent = "";
	if (!currentPw || !newPw || !newPw2) {
		changePwMsgEl.textContent = "All fields are required.";
		return;
	}
	if (simpleHash(currentPw) !== user.passwordHash) {
		changePwMsgEl.textContent = "Current password is incorrect.";
		return;
	}
	if (newPw !== newPw2) {
		changePwMsgEl.textContent = "Passwords do not match.";
		return;
	}
	if (!isValidPassword(newPw)) {
		changePwMsgEl.textContent = "Password must be at least 8 characters and include letters and numbers.";
		return;
	}
	resetUserPassword(user.id, newPw);
	currentPwInput.value = "";
	newPwInput.value = "";
	newPw2Input.value = "";
	bootstrap.Modal.getOrCreateInstance(changePwModalEl).hide();
	alert("Password updated.");
}

function renderAdmin() {
	const user = getCurrentUser();
	if (!isAdmin(user)) return;
	// Notes table
	if (adminNotesListEl) {
		const term = (adminNotesSearchEl?.value || "").trim().toLowerCase();
		const filteredNotes = notes.filter((n) => {
			if (!term) return true;
			const hay = `${n.title} ${n.author} ${n.className} ${n.topic} ${n.year}`.toLowerCase();
			return hay.includes(term);
		});
		let html = '<div class="d-flex align-items-center mb-2"><button id="adminDeleteSelected" class="btn btn-sm btn-outline-danger me-2">Delete Selected</button><span class="small text-secondary" id="adminSelectedCount">0 selected</span></div>';
		html += '<table class="table table-sm align-middle"><thead><tr><th style="width:32px;"><input type="checkbox" id="adminSelectAll"></th><th>Title</th><th>Author</th><th>Class</th><th>Year</th><th>Topic</th><th></th></tr></thead><tbody>';
		filteredNotes.forEach((n) => {
				html += `<tr>
				<td><input type="checkbox" class="form-check-input" data-select-id="${n.id}"></td>
				<td>${escapeHtml(n.title)}</td>
				<td>${escapeHtml(n.author)}</td>
				<td>${escapeHtml(n.className)}</td>
				<td>${escapeHtml(String(n.year))}</td>
				<td>${escapeHtml(n.topic)}</td>
				<td class="text-end">
					<button class="btn btn-sm btn-outline-primary me-1" data-action="edit" data-id="${n.id}">Edit</button>
					<button class="btn btn-sm btn-outline-danger" data-action="delete-note" data-id="${n.id}">Delete</button>
				</td>
			</tr>`;
		});
		html += '</tbody></table>';
		adminNotesListEl.innerHTML = html;
		adminNotesListEl.querySelectorAll('button[data-action="delete-note"]').forEach((btn) => {
			btn.addEventListener("click", () => {
				const id = btn.getAttribute("data-id");
				if (!confirm("Delete this note?")) return;
				deleteNote(id);
				renderAdmin();
				renderList();
			});
		});
		adminNotesListEl.querySelectorAll('button[data-action="edit"]').forEach((btn) => {
			btn.addEventListener("click", () => {
				const id = btn.getAttribute("data-id");
				const note = notes.find((n) => n.id === id);
				if (note) openEditNote(note);
			});
		});

		// Bulk selection handlers
		const selectAll = adminNotesListEl.querySelector('#adminSelectAll');
		const checkboxes = Array.from(adminNotesListEl.querySelectorAll('input[data-select-id]'));
		const selectedCountEl = adminNotesListEl.querySelector('#adminSelectedCount');
		const deleteSelectedBtn = adminNotesListEl.querySelector('#adminDeleteSelected');

		function updateSelectedCount() {
			const count = checkboxes.filter((c) => c.checked).length;
			if (selectedCountEl) selectedCountEl.textContent = `${count} selected`;
		}

		selectAll?.addEventListener('change', () => {
			checkboxes.forEach((c) => (c.checked = selectAll.checked));
			updateSelectedCount();
		});
		checkboxes.forEach((c) => c.addEventListener('change', updateSelectedCount));

		deleteSelectedBtn?.addEventListener('click', () => {
			const ids = checkboxes.filter((c) => c.checked).map((c) => c.getAttribute('data-select-id'));
			if (ids.length === 0) return;
			if (!confirm(`Delete ${ids.length} note(s)?`)) return;
			ids.forEach((id) => deleteNote(id));
			renderAdmin();
			renderList();
		});
	}

	// Users table
	if (adminUsersListEl) {
		const users = loadUsers();
		const term = (adminUsersSearchEl?.value || "").trim().toLowerCase();
		const filteredUsers = users.filter((u) => {
			if (!term) return true;
			const hay = `${u.name || ""} ${u.email || ""} ${u.cwid || ""}`.toLowerCase();
			return hay.includes(term);
		});
		let html = '<table class="table table-sm align-middle"><thead><tr><th>Name</th><th>Email</th><th>CWID</th><th></th></tr></thead><tbody>';
		filteredUsers.forEach((u) => {
			html += `<tr>
				<td>${escapeHtml(u.name)}</td>
				<td>${escapeHtml(u.email)}</td>
				<td>${escapeHtml(u.cwid || "")}</td>
				<td class="text-end">
					<button class="btn btn-sm btn-outline-secondary me-1" data-action="reset-pw" data-id="${u.id}">Reset Password</button>
					<button class="btn btn-sm btn-outline-danger" data-action="delete-user" data-id="${u.id}">Delete</button>
				</td>
			</tr>`;
		});
		html += '</tbody></table>';
		adminUsersListEl.innerHTML = html;
		adminUsersListEl.querySelectorAll('button[data-action="delete-user"]').forEach((btn) => {
			btn.addEventListener("click", () => {
				const id = btn.getAttribute("data-id");
				if (!confirm("Delete this account? Their notes will be anonymized.")) return;
				deleteUser(id);
				renderAdmin();
				renderList();
			});
		});
		adminUsersListEl.querySelectorAll('button[data-action="reset-pw"]').forEach((btn) => {
			btn.addEventListener("click", () => {
				const id = btn.getAttribute("data-id");
				const newPw = prompt("Enter a temporary password (min 8, letters+numbers):");
				if (newPw == null) return;
				if (!isValidPassword(newPw)) { alert("Password must be at least 8 characters and include letters and numbers."); return; }
				resetUserPassword(id, newPw);
				alert("Password reset.");
			});
		});
	}
}

function openEditNote(note) {
	editNoteId.value = note.id;
	editNoteTitle.value = note.title;
	editNoteClass.value = note.className;
	editNoteYear.value = String(note.year);
	editNoteTopic.value = note.topic;
	editNoteContent.value = note.content;
	bootstrap.Modal.getOrCreateInstance(editNoteModalEl).show();
}

function showProfileView() {
	const user = getCurrentUser();
	if (!user) return openAuthModal("login", "Log in to view your profile.");
	profileNotesEl.innerHTML = "";
	const mine = notes.filter((n) => n.authorUserId === user.id);
	if (mine.length === 0) {
		profileNotesEl.innerHTML = '<div class="col-12 text-secondary">You have not posted any notes yet.</div>';
	} else {
		mine.forEach((note) => {
			const avg = calculateAverageRating(note.ratings);
			const col = el("div", "col-12 col-md-6");
			const card = el("div", "card h-100 note-card cursor-pointer");
			card.addEventListener("click", () => {
				profileViewEl.classList.add("d-none");
				showDetailView(note.id);
			});
			const body = el(
				"div",
				"card-body",
				`<div class="d-flex justify-content-between align-items-start">
					<h3 class="h5">${escapeHtml(note.title)}</h3>
					<div class="ms-2 small text-nowrap">${renderStars(avg)}</div>
				</div>
				<p class="mb-1 text-secondary small">${escapeHtml(note.className)} · ${escapeHtml(String(note.year))} · ${escapeHtml(note.topic)}</p>
				<p class="mb-0 text-truncate-2">${escapeMultilineToHtml(note.content)}</p>`
			);
			card.appendChild(body);
			col.appendChild(card);
			profileNotesEl.appendChild(col);
		});
	}
	listViewEl.classList.add("d-none");
	profileViewEl.classList.remove("d-none");
	// Collapse hamburger menu
	collapseHamburgerMenu();
}

function showAddNoteView() {
	const user = getCurrentUser();
	if (!user) return openAuthModal("login", "Log in to add notes.");
	
	// Populate year dropdown
	populateYearDropdowns();
	
	// Clear form
	addNotePageForm.reset();
	fileListEl.innerHTML = "";
	
	// Show the view
	listViewEl.classList.add("d-none");
	detailViewEl.classList.add("d-none");
	profileViewEl.classList.add("d-none");
	addNoteViewEl.classList.remove("d-none");
	// Collapse hamburger menu
	collapseHamburgerMenu();
}

function handleFileUpload() {
	const files = Array.from(addNotePageFiles.files);
	fileListEl.innerHTML = "";
	
	files.forEach((file, index) => {
		if (file.size > 10 * 1024 * 1024) { // 10MB limit
			alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
			return;
		}
		
		const fileItem = document.createElement("div");
		fileItem.className = "d-flex justify-content-between align-items-center border rounded p-2 mb-2";
		
		// Check if file is an image
		const isImage = file.type.startsWith('image/');
		let previewHtml = '';
		
		if (isImage) {
			const reader = new FileReader();
			reader.onload = function(e) {
				const previewImg = fileItem.querySelector('.file-preview');
				if (previewImg) {
					previewImg.src = e.target.result;
				}
			};
			reader.readAsDataURL(file);
			previewHtml = `<img class="file-preview me-2" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" src="" alt="Preview">`;
		}
		
		fileItem.innerHTML = `
			<div class="d-flex align-items-center">
				${previewHtml}
				<div>
					<strong>${escapeHtml(file.name)}</strong>
					<small class="text-muted d-block">${(file.size / 1024 / 1024).toFixed(2)} MB</small>
				</div>
			</div>
			<button type="button" class="btn btn-sm btn-outline-danger remove-file-btn" data-index="${index}">
				Remove
			</button>
		`;
		
		fileListEl.appendChild(fileItem);
	});
	
	// Add event listeners for remove buttons
	fileListEl.querySelectorAll('.remove-file-btn').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const index = parseInt(e.target.dataset.index);
			removeFile(index);
		});
	});
}

function removeFile(index) {
	const dt = new DataTransfer();
	const files = Array.from(addNotePageFiles.files);
	
	files.forEach((file, i) => {
		if (i !== index) {
			dt.items.add(file);
		}
	});
	
	addNotePageFiles.files = dt.files;
	handleFileUpload(); // Refresh the display
}

async function submitAddNotePage() {
	const user = getCurrentUser();
	if (!user) return;
	
	const title = document.getElementById("addNotePageTitle").value.trim();
	const className = document.getElementById("addNotePageClass").value;
	const year = document.getElementById("addNotePageYear").value;
	const topic = document.getElementById("addNotePageTopic").value.trim();
	const content = document.getElementById("addNotePageContent").value.trim();
	
	if (!title || !className || !year || !topic || !content) {
		alert("Please fill in all required fields.");
		return;
	}
	
	// Process uploaded files (images only)
	const files = Array.from(addNotePageFiles.files);
	const attachments = [];
	
	for (const file of files) {
		// Only allow image files
		if (!file.type.startsWith('image/')) {
			alert(`File "${file.name}" is not an image. Only image files are allowed.`);
			continue;
		}
		
		const attachment = {
			id: generateId(),
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
			url: `#file-${file.name}`
		};
		
		// Store the image data URL for display
		attachment.dataUrl = await new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => resolve(e.target.result);
			reader.readAsDataURL(file);
		});
		attachment.url = attachment.dataUrl; // Use data URL for display
		
		attachments.push(attachment);
	}
	
	const note = {
		id: generateId(),
		title,
		className,
		year: Number(year),
		topic,
		content,
		author: user.firstName + " " + user.lastName,
		authorUserId: user.id,
		ratings: [],
		createdAt: Date.now(),
		attachments: attachments
	};
	
	notes.push(note);
	saveNotes(notes);
	
	// Show success message and go to the new note's detail page
	alert("Note created successfully!");
	addNoteViewEl.classList.add("d-none");
	// Force refresh the list to show the new note
	renderList(true);
	showDetailView(note.id);
}

function openImageModal(imageUrl, imageName) {
	const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
	const imageModalImg = document.getElementById('imageModalImg');
	const imageModalTitle = document.getElementById('imageModalTitle');
	
	imageModalImg.src = imageUrl;
	imageModalImg.alt = imageName;
	imageModalTitle.textContent = imageName;
	
	imageModal.show();
}

function viewDocument(attachmentId) {
	// Find the attachment in all notes
	const notes = loadNotes();
	let attachment = null;
	let noteTitle = '';
	
	for (const note of notes) {
		if (note.attachments) {
			const foundAttachment = note.attachments.find(att => att.id === attachmentId);
			if (foundAttachment) {
				attachment = foundAttachment;
				noteTitle = note.title;
				break;
			}
		}
	}
	
	if (!attachment) {
		alert('Attachment not found');
		return;
	}
	
	// Since we only allow images now, just show a message
	const documentModal = new bootstrap.Modal(document.getElementById('documentModal'));
	const documentModalTitle = document.getElementById('documentModalTitle');
	const documentModalContent = document.getElementById('documentModalContent');
	
	documentModalTitle.textContent = `${attachment.name} - ${noteTitle}`;
	documentModalContent.textContent = 'This is an image attachment. Click on the image above to view it in full size.';
	
	documentModal.show();
}

// Make functions available globally for onclick handlers
window.openImageModal = openImageModal;
window.viewDocument = viewDocument;

// Collapse hamburger menu function
function collapseHamburgerMenu() {
	const navbarCollapse = document.getElementById('navbarToggleExternalContent');
	if (navbarCollapse && navbarCollapse.classList.contains('show')) {
		const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
			toggle: false
		});
		bsCollapse.hide();
	}
}

// Dummy data generator
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function generateDummyNotes(count) {
	const classes = ["MIS 200", "MIS 221", "MIS 321", "MIS 330"];
	const topics = ["Intro", "Midterm", "Final", "Project", "Lecture", "Lab", "Review", "Notes"];
	const current = new Date().getFullYear();
	for (let i = 0; i < count; i++) {
		const anonymous = Math.random() < 0.4;
		const title = Math.random() < 0.2 ? "" : `Sample Note ${generateId().slice(0,5)}`;
		const content = Math.random() < 0.3 ? "" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget.";
		const note = {
			id: generateId(),
			title,
			content,
			author: anonymous ? "Anonymous" : `User ${generateId().slice(0,4)}`,
			authorUserId: anonymous ? null : generateId(),
			className: randomChoice(classes),
			year: current - Math.floor(Math.random() * 7),
			topic: randomChoice(topics),
			createdAt: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365),
			ratings: [],
		};
		// Optionally add some ratings
		const rCount = Math.floor(Math.random() * 8); // 0..7
		for (let r = 0; r < rCount; r++) {
			note.ratings.push({ userId: generateId(), value: 1 + Math.floor(Math.random() * 5), at: Date.now() });
		}
		notes.push(note);
	}
	saveNotes(notes);
}


