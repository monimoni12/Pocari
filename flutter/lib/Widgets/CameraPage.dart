import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'dart:io';

class CameraPage extends StatefulWidget {
  const CameraPage({super.key});

  @override
  _CameraPageState createState() => _CameraPageState();
}

class _CameraPageState extends State<CameraPage> {
  CameraController? _cameraController;
  List<CameraDescription>? cameras;
  XFile? image;

  @override
  void initState() {
    super.initState();
    availableCameras().then((availableCameras) {
      cameras = availableCameras;
      _cameraController = CameraController(cameras![0], ResolutionPreset.high);
      _cameraController!.initialize().then((_) {
        if (!mounted) return;
        setState(() {});
      });
    });
  }

  Future<void> takePicture() async {
    if (_cameraController != null && _cameraController!.value.isInitialized) {
      image = await _cameraController!.takePicture();
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Camera')),
      body: Column(
        children: [
          _cameraController != null && _cameraController!.value.isInitialized
              ? AspectRatio(
                  aspectRatio: _cameraController!.value.aspectRatio,
                  child: CameraPreview(_cameraController!),
                )
              : Container(),
          ElevatedButton(
            onPressed: takePicture,
            child: const Text('Take Picture'),
          ),
          image != null ? Image.file(File(image!.path)) : Container(),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _cameraController?.dispose();
    super.dispose();
  }
}
