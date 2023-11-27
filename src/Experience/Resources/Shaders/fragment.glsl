precision mediump float;

varying vec2 vUv;
uniform float uTime;

float normalSin(float value) {
    return sin(value) * 0.5 + 0.5;
}

float squares(vec2 uv, float size) {
    float halfSize = size / 2.;
    float left = step(0.5 - halfSize, uv.x);
    float right = step(uv.x, 0.5 + halfSize);
    float top = step(0.5 - halfSize, uv.y);
    float bottom = step(uv.y, 0.5 + halfSize);

    return left * right * top * bottom;
}

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d)); // 6.28318” is PI * 2
}

void main() {
    vec2 uv = vUv;
    vec3 color = vec3(0);

    float dist = distance(vec2(0.5), uv);
    dist = 1.0 - dist * 2.0;
    // float freq = dist * 40.0 + uTime * 2.0;
    float freq = dist * 40.0 - uTime * 2.0;
    float amp = 0.2;
    uv.x += cos(freq) * amp;
    uv.y += sin(freq) * amp;
    float square = squares(uv, 0.6);
    square -= squares(uv, 0.4);

    float paletteOffset = dist + uTime * 0.2;
    vec3 firstPalette = palette(paletteOffset, vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.2, 0.25));
    vec3 secondPalette = palette(paletteOffset * 2.0, vec3(0.8, 0.5, 0.4), vec3(0.2, 0.4, 0.2), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.25, 0.25));

    vec3 mixColor = mix(firstPalette, secondPalette, smoothstep(0.2, 0.8, uv.y));

    color = vec3(square) * mixColor;
    // color = 1.0 - color;
    gl_FragColor = vec4(color, 1.0);

}
