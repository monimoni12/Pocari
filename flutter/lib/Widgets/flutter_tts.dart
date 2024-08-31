import 'package:flutter_tts/flutter_tts.dart';

FlutterTts flutterTts = FlutterTts();

Future<void> speak(String message) async {
  await flutterTts.setLanguage("ko-KR"); // 한국어로 설정
  await flutterTts.setPitch(1.0); // 음성의 높낮이를 설정
  await flutterTts.speak(message); // TTS로 메시지 읽기
}
