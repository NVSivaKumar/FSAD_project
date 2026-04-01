package com.careerguidance.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    private final String UPLOAD_DIR = "uploads";

    public String saveFile(MultipartFile file, String subDir) throws IOException {
        if (file == null || file.isEmpty()) return null;

        String folder = UPLOAD_DIR + (subDir != null ? "/" + subDir : "");
        File directory = new File(folder);
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
        }

        String fileName = file.getName() + "-" + System.currentTimeMillis() + "-" + Math.round(Math.random() * 1E9) 
                + getFileExtension(file.getOriginalFilename());
        
        Path path = Paths.get(folder, fileName);
        Files.write(path, file.getBytes());

        return folder + "/" + fileName;
    }

    private String getFileExtension(String originalFilename) {
        if (originalFilename != null && originalFilename.lastIndexOf(".") > 0) {
            return originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        return "";
    }
}
