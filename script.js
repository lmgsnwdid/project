// 9가지 질문 목록 정의 (원하는 질문으로 수정 가능)
const questions = [
  "1. 파시 방학을 보내며 가장 기억에 남는 순간",
  "2. 요즘 나의 신앙의 온도는?",
  "3. 최근에 빠진 것",
  "4. 나에게 가장 힘이 되었던 말씀 구절",
  "5. 하반기 나의 가장 큰 목표",
  "6. 자랑하고 싶은 것",
  "7. 파스 영상 중 최애 영상",
  "8. 나의 삶에 큰 영향을 준 사람",
  "9. 파워스테이션 사역 중 가장 기억에 남는 시간"
];

const questionsContainer = document.getElementById('questions-container');
const cardGrid = document.getElementById('card-grid');

// 1. 9개 질문 입력 폼 및 결과 출력 틀 자동 생성
questions.forEach((q, index) => {
  // 폼 입력란 생성
  const qDiv = document.createElement('div');
  qDiv.className = 'q-item';
  qDiv.innerHTML = `
    <div class="photo-upload" id="photoUpload">
          <div class="photo-icon">📷</div>
          <strong>${q}</strong>
          <p>JPG, PNG 이미지 권장</p>
          <label for="photoInput" class="upload-btn">사진 선택</label>
          <input type="file" id="photoInput" accept="image/*"/>
        </div>
    </div>
    <br>
  `;
  questionsContainer.appendChild(qDiv);

  // 프로필 카드 미리보기 틀 생성
  const gridItem = document.createElement('div');
  gridItem.className = 'grid-item';
  gridItem.innerHTML = `
    <img id="preview-img-${index}" src="" alt="사진 미선택" style="display:none;">
    <p class="title">${q}</p>
    <p class="desc" id="preview-text-${index}"></p>
  `;
  cardGrid.appendChild(gridItem);
});

// 2. 메인 프로필 사진 미리보기 처리
document.getElementById('photoInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const avatar = document.getElementById('card-avatar');
      avatar.style.backgroundImage = `url(${event.target.result})`;
      avatar.textContent = '';
    };
    reader.readAsDataURL(file);
  }
});

// 3. '프로필 카드 만들기' 버튼 클릭 시 데이터 동기화
document.getElementById('generate-btn').addEventListener('click', () => {
  // 이름 및 성경구절 반영
  document.getElementById('card-name').textContent = document.getElementById('user-name').value || "이름 미입력";
  document.getElementById('card-verse').textContent = document.getElementById('user-verse').value || "";

  // 9개 질문 이미지 및 텍스트 반영
  const imgInputs = document.querySelectorAll('.q-img');

  imgInputs.forEach((input, i) => {
    const file = input.files[0];
    const imgElement = document.getElementById(`preview-img-${i}`);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imgElement.src = e.target.result;
        imgElement.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });


  alert("프로필 카드가 업데이트되었습니다. 아래로 내려 확인하세요!");
});

// 4. 이미지로 내보내기 (html2canvas 사용)
document.getElementById('export-btn').addEventListener('click', () => {
  const cardArea = document.getElementById('profile-card');
  
  html2canvas(cardArea).then(canvas => {
    const link = document.createElement('a');
    link.download = 'church_profile.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});