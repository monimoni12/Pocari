// lib/services/api_service.dart

import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  // 백엔드 API 엔드포인트 URL
  final String apiUrl = 'http://localhost:3000/api/upload';

  // 이미지 파일을 백엔드에 업로드하는 함수
  Future<void> uploadImage(String imagePath) async {
    try {
      // URI 설정
      final uri = Uri.parse(apiUrl);

      // 멀티파트 요청 생성
      final request = http.MultipartRequest('POST', uri)
        ..files.add(await http.MultipartFile.fromPath('image', imagePath));

      // 요청 전송 및 응답 처리
      final response = await request.send();

      if (response.statusCode == 200) {
        // 성공적인 응답 처리
        final res = await response.stream.bytesToString();
        final jsonResponse = jsonDecode(res);
        print('Response: $jsonResponse');
      } else {
        // 실패한 응답 처리
        print('Failed to upload image');
      }
    } catch (e) {
      print('Error: $e');
    }
  }
}
