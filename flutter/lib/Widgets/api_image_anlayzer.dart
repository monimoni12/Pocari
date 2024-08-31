import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

Future<void> analyzeImage(File imageFile) async {
  String apiKey = 'YOUR_OPENAI_API_KEY';
  String url = 'https://api.openai.com/v1/images/generations';

  var request = http.MultipartRequest('POST', Uri.parse(url))
    ..headers['Authorization'] = 'Bearer $apiKey'
    ..files.add(await http.MultipartFile.fromPath('file', imageFile.path));

  var response = await request.send();
  if (response.statusCode == 200) {
    var responseData = await response.stream.bytesToString();
    var result = json.decode(responseData);
    print('Analysis Result: $result');
    // 여기서 TTS로 결과를 음성으로 안내할 수 있음
  } else {
    print('Error: ${response.statusCode}');
  }
}
