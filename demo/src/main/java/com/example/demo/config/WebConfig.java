package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${file.storage.songs-dir:songs}")
    private String songsDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path songPath = Paths.get(songsDir).toAbsolutePath();
        String location = songPath.toUri().toString();
        registry.addResourceHandler("/media/songs/**").addResourceLocations(location);
    }
}

