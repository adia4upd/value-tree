/**
 * Value Tree — 회원 주문 신청서 Google Apps Script
 *
 * 사용법:
 * 1. Google Sheets 열기 → 확장 프로그램 → Apps Script
 * 2. 이 코드 전체 붙여넣기
 * 3. SHEET_NAME을 실제 시트 이름으로 변경
 * 4. 저장 후 [배포] → [새 배포] → 유형: 웹앱
 *    - 액세스: 모든 사용자
 *    - 실행: 나 (본인 계정)
 * 5. 배포 URL을 index.html의 GOOGLE_SCRIPT_URL에 붙여넣기
 */

// ✅ Apps Script에 이 코드를 붙여넣고 배포하세요 (시트 이름: 신청서)

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('신청서');
  const data = JSON.parse(e.postData.contents);

  // 헤더가 없으면 첫 행 자동 생성
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(Object.keys(data));
  }

  sheet.appendRow(Object.values(data));

  return ContentService.createTextOutput('success');
}

function doGet(e) {
  return ContentService.createTextOutput('Value Tree Apps Script is running.');
}
