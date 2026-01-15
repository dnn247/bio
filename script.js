let hasUserInteracted = false;

function initMedia() {
  const backgroundMusic = document.getElementById('background-music');
  const backgroundVideo = document.getElementById('background');
  if (!backgroundMusic || !backgroundVideo) {
    return;
  }
  backgroundMusic.volume = 0.3;
  backgroundVideo.muted = true; 
  
  backgroundVideo.play().catch(err => {
    console.error(err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const topControls = document.querySelector('.top-controls');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const backgroundVideo = document.getElementById('background');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  
  const startMessage = "(￣o￣) zzZZzzZZ";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);

  function initializeVisitorCounter() {
    let totalVisitors = localStorage.getItem('totalVisitorCount');
    
    if (!totalVisitors || parseInt(totalVisitors) > 16466) {
      totalVisitors = 16466;
      localStorage.setItem('totalVisitorCount', totalVisitors);
      localStorage.removeItem('hasVisited'); 
    } else {
      totalVisitors = parseInt(totalVisitors);
    }

    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      totalVisitors++;
      localStorage.setItem('totalVisitorCount', totalVisitors);
      localStorage.setItem('hasVisited', 'true');
    }

    if (visitorCount) {
        visitorCount.textContent = totalVisitors.toLocaleString();
    }
  }

  initializeVisitorCounter();

  function enterSite(e) {
    if (e) e.preventDefault();
    
    startScreen.classList.add('hidden');
    topControls.classList.remove('hidden');
    
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(err => {
      console.error(err);
    });

    profileBlock.classList.remove('hidden');
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
        profileBlock.classList.add('profile-appear');
        profileContainer.classList.add('orbit');
      }}
    );

    typeWriterName();
    profileBio.textContent = "sleep";
  }

  startScreen.addEventListener('click', enterSite);
  startScreen.addEventListener('touchstart', enterSite);

  const name = "dont";
  let nameText = '';
  let nameIndex = 0;
  let nameCursorVisible = true;

  function typeWriterName() {
    if (nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1);
      nameIndex++;
      profileName.textContent = nameText + '|';
      
      setTimeout(typeWriterName, 150);
    } else {
      setInterval(() => {
        nameCursorVisible = !nameCursorVisible;
        profileName.textContent = name + (nameCursorVisible ? '|' : ' ');
      }, 500);
    }
  }

  let currentAudio = backgroundMusic;
  let isMuted = false;

  function toggleMute(e) {
      if(e) e.preventDefault();
      isMuted = !isMuted;
      currentAudio.muted = isMuted;
      volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  }

  volumeIcon.addEventListener('click', toggleMute);
  volumeIcon.addEventListener('touchstart', toggleMute);

  volumeSlider.addEventListener('input', () => {
    currentAudio.volume = volumeSlider.value;
    isMuted = false;
    currentAudio.muted = false;
    volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const maxTilt = 20;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.2,
      ease: 'power1.out',
      transformPerspective: 1000
    });
  }

  [profileBlock, skillsBlock].forEach(block => {
      block.addEventListener('mouseenter', () => {
        gsap.to(block, { 
          scale: 1.10, 
          duration: 0.4, 
          ease: 'back.out(1.7)' 
        });
      });

      block.addEventListener('mousemove', (e) => handleTilt(e, block));
      block.addEventListener('touchmove', (e) => { e.preventDefault(); handleTilt(e, block); });
      
      const resetTilt = () => {
        gsap.to(block, { 
          rotationX: 0, 
          rotationY: 0, 
          scale: 1, 
          duration: 0.6, 
          ease: 'power2.out' 
        });
      };
      
      block.addEventListener('mouseleave', resetTilt);
      block.addEventListener('touchend', resetTilt);
  });

  profilePicture.addEventListener('mouseenter', () => {
    glitchOverlay.style.opacity = '1';
    setTimeout(() => { glitchOverlay.style.opacity = '0'; }, 500);
  });

  function spinProfile(e) {
      if(e) e.preventDefault();
      profileContainer.classList.remove('fast-orbit', 'orbit');
      void profileContainer.offsetWidth; 
      profileContainer.classList.add('fast-orbit');
      setTimeout(() => {
        profileContainer.classList.remove('fast-orbit');
        void profileContainer.offsetWidth;
        profileContainer.classList.add('orbit');
      }, 500);
  }

  profilePicture.addEventListener('click', spinProfile);
  profilePicture.addEventListener('touchstart', spinProfile);

  let isShowingSkills = false;
  
  function toggleSkills(e) {
      if(e) e.preventDefault();
      
      if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100, opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100, opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  }

  resultsButton.addEventListener('click', toggleSkills);
  resultsButton.addEventListener('touchstart', toggleSkills);

  typeWriterStart();
});