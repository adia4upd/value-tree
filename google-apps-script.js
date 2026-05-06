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

  // 1행 헤더 항상 최신 COLUMNS로 강제 업데이트
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
  } else {
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
  }

  // COLUMNS 순서대로 값 추출 (없는 키는 빈칸)
  const row = COLUMNS.map(col => (data[col] !== undefined && data[col] !== null) ? data[col] : '');
  sheet.appendRow(row);

  return ContentService.createTextOutput('success');
}

function doGet(e) {
  return ContentService.createTextOutput('Value Tree Apps Script is running.');
}
