export default function Map(str: string){
    // replaces line breaks with %0A, which is the URL encoding for a line break. This ensures that line breaks don't get lost when using a HTTP Get request.
    return str.replaceAll("\n", "%0A");
}