let files = [];

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const fileURL = URL.createObjectURL(file);
        const fileType = file.type;

        // Classify files into types
        if (fileType.startsWith('image/') || fileType.startsWith('application/')) {
            files.push({ name: file.name, url: fileURL, type: 'document' });
        } else if (fileType.startsWith('video/')) {
            files.push({ name: file.name, url: fileURL, type: 'video' });
        } else {
            files.push({ name: file.name, url: fileURL, type: 'file' });
        }

        displayFiles();
        fileInput.value = ''; // Reset the input
    }
}

function displayFiles() {
    const filesSection = document.getElementById('filesSection');
    const videosSection = document.getElementById('videosSection');
    const documentsSection = document.getElementById('documentsSection');

    filesSection.innerHTML = '';
    videosSection.innerHTML = '';
    documentsSection.innerHTML = '';

    files.forEach((file, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${file.url}" download="${file.name}">${file.name}</a> <button onclick="deleteFile(${index})">Delete</button>`;

        if (file.type === 'file') {
            filesSection.appendChild(li);
        } else if (file.type === 'video') {
            videosSection.appendChild(li);
        } else if (file.type === 'document') {
            documentsSection.appendChild(li);
        }
    });
}

function deleteFile(index) {
    files.splice(index, 1);
    displayFiles();
}

function logout() {
    alert('You have logged out.');
}

