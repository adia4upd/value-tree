/**
 * Value Tree — 회원 주문 신청서 Google Apps Script
 *
 * 사용법:
 * 1. Google Sheets 열기 → 확장 프로그램 → Apps Script
 * 2. 이 코드 전체 붙여넣기
 * 3. 저장 후 [배포] → [새 배포] → 유형: 웹앱
 *    - 액세스: 모든 사용자
 *    - 실행: 나 (본인 계정)
 * 4. 배포 URL을 index.html의 GOOGLE_SCRIPT_URL에 붙여넣기
 */

// ✅ 컬럼 순서 고정 (이 순서대로 엑셀에 들어감)
const COLUMNS = [
  '신청 일시',
  '가입 ID',
  '이름',
  '전화번호',
  '우편번호',
  '기본 주소',
  '상세 주소',
  '영문 주소',
  '통관 번호',
  '소개자 아이디',
  '담당자 지정 아이디',
  '제품 선택',
  'Alpha GPC 수량',
  'NMN 수량',
  'SUPER PROST AID 수량',
  'JOINT CARE 수량',
  'GLUCOLYSE 수량',
  '퍼플 수량',
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('신청서');
  const data = JSON.parse(e.postData.contents);

  // 헤더가 없으면 첫 행 자동 생성 (COLUMNS 순서 고정)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
  }

  // COLUMNS 순서대로 값 추출 (없는 키는 빈칸)
  const row = COLUMNS.map(col => data[col] !== undefined ? data[col] : '');
  sheet.appendRow(row);

  return ContentService.createTextOutput('success');
}

function doGet(e) {
  return ContentService.createTextOutput('Value Tree Apps Script is running.');
}
