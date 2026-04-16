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

const SHEET_NAME = 'Sheet1'; // 실제 시트 탭 이름으로 변경

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // 헤더가 없으면 첫 행에 자동 생성
    if (sheet.getLastRow() === 0) {
      const headers = [
        '신청 일시', '가입 ID', '통관 번호', '이름', '전화번호',
        '우편번호', '기본 주소', '상세 주소', '영문 주소', '가입 경로', '담당자', '제품명'
      ];
      sheet.appendRow(headers);

      // 헤더 스타일
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4a6741');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }

    // 데이터 행 추가
    const row = [
      data['신청 일시'] || new Date().toLocaleString('ko-KR'),
      data['가입 ID'] || '',
      data['통관 번호'] || '',
      data['이름'] || '',
      data['전화번호'] || '',
      data['우편번호'] || '',
      data['기본 주소'] || '',
      data['상세 주소'] || '',
      data['영문 주소'] || '',
      data['가입 경로'] || '',
      data['담당자'] || '',
      data['제품명'] || '',
    ];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 테스트용
function doGet(e) {
  return ContentService
    .createTextOutput('Value Tree Apps Script is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
