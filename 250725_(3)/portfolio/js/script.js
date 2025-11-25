// 1. 네비게이션 바
//HTML DOM이 완성되기 전에 실행되어 null이 되는 것 방지
document.addEventListener('DOMContentLoaded', () => {
  // 햄버거 버튼 요소 가져오기
  const hamburger = document.getElementById('hamburger');

  // 네비게이션 메뉴 요소 가져오기
  const navMenu = document.getElementById('nav-menu');

  // 햄버거 버튼 클릭 시 메뉴 보이거나 숨기기
   hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');     // 메뉴 열기/닫기
    hamburger.classList.toggle('active');   // 아이콘 변경
  });

  // 메뉴 항목 클릭 시 메뉴 닫기 + 아이콘 원상복귀
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
});
// 2. 메인 화면


// 3. 소개 섹션
const rotator = document.getElementById("rotator");
let flipped = false;

let isDragging = false;
let startX = 0;
let currentX = 0;
let dragThreshold = 80; // 회전 확정에 필요한 최소 드래그 거리
let maxRotation = 25;   // 최대 회전 각도 (도 단위)

// 회전 토글 함수
function rotate() {
  flipped = !flipped;
  rotator.classList.toggle("flipped", flipped);
  rotator.style.transform = ""; // transform 초기화
}

// 마우스 누르면 드래그 시작
rotator.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  rotator.style.cursor = "grabbing";
  rotator.style.transition = "none"; // 실시간 회전을 위해 transition 제거
});

// 마우스 움직이는 동안 회전 각도 반영
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  currentX = e.clientX;
  const deltaX = currentX - startX;

  // 드래그 거리 비례 회전 (최대 maxRotation도)
  let rotationY = (deltaX / dragThreshold) * maxRotation;
  rotationY = Math.max(Math.min(rotationY, maxRotation), -maxRotation); // 제한 범위

  // 회전 방향: 아직 안 뒤집혔으면 정방향, 뒤집힌 상태면 역방향 보정
  const adjustedRotation = flipped ? 180 + rotationY : rotationY;

  rotator.style.transform = `rotateY(${adjustedRotation}deg)`;
});

// 마우스 떼면 회전 확정 또는 복귀
document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;

  isDragging = false;
  rotator.style.cursor = "grab";
  const deltaX = e.clientX - startX;

  rotator.style.transition = "transform 0.5s ease"; // 애니메이션 복구

  if (deltaX > dragThreshold && !flipped) {
    rotate(); // 오른쪽으로 충분히 드래그 → 회전
  } else if (deltaX < -dragThreshold && flipped) {
    rotate(); // 왼쪽으로 충분히 드래그 → 회전
  } else {
    // 드래그가 부족하면 원래 각도로 복귀
    const resetAngle = flipped ? 180 : 0;
    rotator.style.transform = `rotateY(${resetAngle}deg)`;
  }
});

// 4. 스킬 섹션
    const techData = {
      "HTML5": "HTML5는 웹 문서의 구조를 정의하는 최신 마크업 언어입니다.",
      "CSS": "CSS는 HTML 요소의 스타일을 정의합니다.",
      "Javascript": "JavaScript는 웹 페이지에 동적인 기능을 추가하는 언어입니다.",
      "React": "React는 사용자 인터페이스를 만드는 JS 라이브러리입니다.",
      "JAVA": "Java는 다양한 플랫폼에서 실행되는 객체지향 언어입니다.",
      "Git Hub": "GitHub는 Git 저장소를 관리하는 웹 플랫폼입니다.",
      "DevOps": `DevOps는 개발과 운영의 통합 문화를 말합니다.
                → CI/CD를 위한 젠킨스 
                → 인프라를 손쉽게 구축하고 안전하게 변경하기 위한 TerraForm 배포 툴 
                → CD 파이프라인 
                → 소프트웨어 개발과 서버리스 배포 
                → 컨테이너 기술과 도커의 동작원리 
                → 도커파일을 사용한 코드에 의한 서버 구축`,
      "Linux": `Linux는 서버, 개발 환경에 많이 쓰이는 운영체제입니다. 
                → OS 가상화 및 Linux 설치
                → Linux 기본 명령어와 환경변수 설정
                → 파일과 디렉토리 관리
                → 원격 서버연결(SSH), 프로세스 관리
                → 웹 애플리케이션 서비스 개발 환경 설정`,
      "Database": "Database는 데이터를 저장하고 관리하는 시스템입니다.",
      "JDBC": "JDBC는 자바에서 DB에 접근하는 기술입니다.",
      "JSP": "JSP는 Java 기반의 동적 웹페이지 생성 기술입니다.",
      "Servlet": "Servlet은 Java 웹 서버 측 로직을 처리하는 클래스입니다.",
      "Spring Boot": "Spring Boot는 설정 없이 빠르게 앱을 개발할 수 있는 프레임워크입니다.",
      "SAP ABAP": "ABAP는 SAP의 주요 개발 언어입니다.",
      "SAP FIORI": "FIORI는 SAP의 직관적인 사용자 인터페이스 디자인 시스템입니다.",
      "SAP Public Cloud": "SAP의 퍼블릭 클라우드 기반 ERP 환경입니다.",
      "RFC (I/F)": "RFC는 SAP 간 원격 함수 호출 방식입니다.",
      "Gateway, oData (I/F)": "REST 기반 SAP API 인터페이스입니다.",
      "BAPI, BDC": "SAP 표준 함수와 화면 기반 자동입력 방식입니다.",
      "Function": "SAP 함수 모듈은 재사용 가능한 기능 단위입니다.",
      "Class": "SAP 클래스는 객체지향 구조를 따릅니다.",
      "BADI, User Exit": "SAP 커스터마이징 확장 지점입니다.",
      "Tree 구조": "계층형 UI 표현 방식입니다.",
      "ALV, 이벤트": "SAP 리스트 출력과 사용자 상호작용 처리입니다.",
      "Batch Job": "SAP 백그라운드 작업 처리 방식입니다.",
      "SAP Public Cloud RAP개발": "SAP Cloud에서 RAP(Restful ABAP Programming) 개발 방식입니다."
    };

    // 두 개의 컬럼(왼쪽, 오른쪽) 요소 가져오기
    const column1 = document.getElementById('column1');
    const column2 = document.getElementById('column2');
    // 모달 요소 및 내부 텍스트 요소들 가져오기
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    // techData 객체를 순회하며 라벨 생성 및 배치
    let i = 0;
    for (let key in techData) {
      // 각 기술 항목에 대한 라벨(label) 생성
      const label = document.createElement('label');
      label.className = 'tech-item';
      // 라벨 안에 라디오 버튼과 키워드 표시
      label.innerHTML = `<input type="radio" name="tech"> #${key}`;
      // 라디오 버튼 클릭 시 해당 키워드에 대한 모달 오픈
      label.querySelector('input').addEventListener('click', () => openModal(key));

      // 앞의 13개는 column1에, 이후는 column2에 추가
      if (i < 13) {
        column1.appendChild(label);
      } else {
        column2.appendChild(label);
      }
      i++;
    }

    // 특정 키워드 클릭 시 실행되는 함수: 모달 열기
    function openModal(keyword) {
      modalTitle.textContent = `#${keyword}`;
      modalDesc.innerHTML = techData[keyword].replace(/\n/g, "<br>");
      modal.style.display = 'block';
    }

    // 모달 닫기 함수
    function closeModal() {
      modal.style.display = 'none';
    }

    // 모달 영역 외부 클릭 시 모달 닫기
    window.onclick = function(event) {
      if (event.target === modal) {
        closeModal(); // 클릭한 대상이 모달 배경이면 닫기
      }
    }

// 5. 프로젝트 섹션
function goToDetail(url) {
    window.location.href = url;
}


// 6. 연락처 섹션 
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // 폼 기본 제출 막기

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("result");

  if (!name || !email || !message) {
    result.style.color = "red";
    result.textContent = "모든 항목을 입력해주세요.";
    return;
  }

  // 실제 전송 로직 (ex. fetch 또는 email API 등)은 여기에 작성
  console.log("전송된 메시지:", { name, email, message });

  result.style.color = "black";
  result.textContent = "메시지가 성공적으로 전송되었습니다.";

  // 입력값 초기화
  document.getElementById("contactForm").reset();
});