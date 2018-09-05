import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class KeyGen {
    private final String tfWidth = "1800";
    private final String tfHeight = "1200";
    public static void main(String[] args) throws IOException{
    
	final BufferedImage imgKey = Crypt.generateKey(800, 500);
        File outputfile = new File("key.png");
        ImageIO.write(imgKey, "png", outputfile);
       // System.out.println(args[0]);
    }
}
