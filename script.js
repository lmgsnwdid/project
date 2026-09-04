const questions = [
  "1. 파시 방학 중 가장 기억에 남는 순간",
  "2. 요즘 신앙의 온도",
  "3. 최근에 빠진 것",
  "4. 가장 힘이 되었던 말씀 구절",
  "5. 하반기 나의 가장 큰 목표",
  "6. 자랑하고 싶은 것",
  "7. 파스 영상 중 최애 영상",
  "8. 나의 삶에 큰 영향을 준 사람",
  "9. 파워스테이션 상반기 사역 중 가장 기억에 남는 사역"
];

const questionsContainer = document.getElementById('questions-container');
const cardGrid = document.getElementById('card-grid');
const index=0;
// 1. 9개 질문 입력 폼 및 결과 출력 틀 자동 생성
questions.forEach((q, index) => {
  // 폼 입력란 생성
  const qDiv = document.createElement('div');
  qDiv.className = 'q-item';
  qDiv.innerHTML = `
    <div class="photo-upload" id="photoUpload">
          <div class="photo-icon">📷</div>
          <strong>${q}</strong><br>
          <label for="photoInput${index}" class="upload-btn">사진 선택</label>
          <input type="file" id="photoInput${index}" class="photoInput" accept="image/*" onchange="changeImage(${index})">
        </div>
    </div>
    <br>
  `;
  questionsContainer.appendChild(qDiv);

  // 프로필 카드 미리보기 틀 생성
  const gridItem = document.createElement('div');
  gridItem.className = 'grid-item';
  gridItem.id = `grid-item${index}`;
  gridItem.innerHTML = `
    <div id="preview-img-${index}" class="preview-img" style="display:none;"></div>
      <p class="title">${q}</p>
      <p class="desc" id="preview-text-${index}"></p>
    
  `;
  cardGrid.appendChild(gridItem);

  index++;
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

function changeImage(index){
  const file = document.getElementById(`photoInput${index}`).files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const avatar = document.getElementById('grid-item' + index);
      avatar.style.backgroundImage = `url(${event.target.result})`;
      avatar.textContent = '';
    };
    reader.readAsDataURL(file);
  }
}
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
  document.getElementById('card-name').textContent = document.getElementById('user-name').value || "이름을 입력해주세요.";
  document.getElementById('card-verse').textContent = document.getElementById('user-verse').value || "나를 표현하는 문장을 입력해주세요.";

  document.querySelector('.preview-section').style.display = 'block'; 

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


  alert("이미지가 업데이트되었습니다. 아래로 내려 확인하세요!");
});

// 4. 이미지로 내보내기 (html2canvas 사용)
document.getElementById('export-btn').addEventListener('click', async () => {

    const original = document.getElementById('profile-card');

    // 카드 복제
    const clone = original.cloneNode(true);

    // 캡처용 고정 크기 설정
    clone.style.width = '1080px';
    clone.style.height = '1080px';
    clone.style.position = 'absolute';
    clone.style.left = '-99999px';
    clone.style.top = '0';
    clone.style.margin = '0';

    document.body.appendChild(clone);

    try {
        const canvas = await html2canvas(clone, {
            width: 1080,
            height: 1080,
            scale: 1,
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const link = document.createElement('a');
        link.download = 'church_profile.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

    } finally {
        // 캡처 후 복제본 삭제
        clone.remove();
    }
});
