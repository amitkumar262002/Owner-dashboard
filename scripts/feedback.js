// Real-time Feedback Management for Owner Dashboard
async function loadFeedback() {
    try {
        const feedbackGrid = document.getElementById('feedbackGrid');
        feedbackGrid.innerHTML = '<p style="color: rgba(255,255,255,0.5); padding: 20px;">Fetching from Vibe Network...</p>';

        // Use the global 'db' from dashboard.js
        const snapshot = await db.collection('vibe_reviews')
            .orderBy('name', 'asc') // Simple sort for now, will add timestamp in submit if not present
            .get();

        if (snapshot.empty) {
            feedbackGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:rgba(255,255,255,0.3);">No feedback received yet.</div>';
            return;
        }

        feedbackGrid.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;

            const card = document.createElement('div');
            card.className = 'feedback-card';
            card.style.cssText = "background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; position:relative; overflow:hidden;";

            let stars = '';
            for (let i = 0; i < 5; i++) stars += (i < data.rating) ? '★' : '☆';

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:15px;">
                    <div>
                        <h4 style="margin:0; font-size:1.1rem; color:#fff;">${data.name}</h4>
                        <div style="color:#ffd700; font-size:1rem; margin-top:2px;">${stars}</div>
                    </div>
                    <span style="font-size:0.75rem; color:rgba(255,255,255,0.3);">${data.dateStr || 'Recent'}</span>
                </div>
                <p style="color:rgba(255,255,255,0.7); font-size:0.95rem; line-height:1.4; margin-bottom:20px;">"${data.text}"</p>
                <div style="display:flex; gap:10px; margin-top:auto;">
                    <button onclick="editFeedback('${id}', '${data.text.replace(/'/g, "\\'")}')" class="action-btn" style="flex:1; background:rgba(0,212,255,0.1); color:#00d4ff; font-size:0.8rem; border:none; padding:8px; border-radius:6px; cursor:pointer;">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="deleteFeedback('${id}')" class="action-btn" style="flex:1; background:rgba(255,45,85,0.1); color:#ff2d55; font-size:0.8rem; border:none; padding:8px; border-radius:6px; cursor:pointer;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
                <div style="position:absolute; bottom:0; right:0; padding:5px 10px; background:rgba(255,255,255,0.05); font-size:0.6rem; color:rgba(255,255,255,0.2);">LIVE ID: ${id.slice(0, 6)}</div>
            `;
            feedbackGrid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading feedback:', error);
        document.getElementById('feedbackGrid').innerHTML = '<p style="color: #ff2d55; padding: 20px;">Error connecting to Vibe Network. Check console.</p>';
    }
}

async function deleteFeedback(id) {
    if (confirm('Permanently delete this user story from all phones?')) {
        try {
            await db.collection('vibe_reviews').doc(id).delete();
            alert('Feedback Deleted!');
            loadFeedback();
        } catch (e) {
            alert('Delete Failed: ' + e.message);
        }
    }
}

async function editFeedback(id, oldText) {
    const newText = prompt("Edit User Story:", oldText);
    if (newText && newText !== oldText) {
        try {
            await db.collection('vibe_reviews').doc(id).update({ text: newText });
            alert('Feedback Updated!');
            loadFeedback();
        } catch (e) {
            alert('Update Failed: ' + e.message);
        }
    }
}

// Initial load
loadFeedback();
