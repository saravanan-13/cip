import java.awt.image.*;
import java.io.*;
import javax.imageio.ImageIO;
import javax.swing.*;
public class Encrypt {
    public static void main(String[] args) throws IOException{
        
	File fKeyFile = new File(args[0]);
    File fSrcFile = new File(args[1]);
    // System.out.println(args[0]);
    // System.out.println(args[0]);
	BufferedImage imgKey = Crypt.loadAndCheckEncrFile(fKeyFile);
	BufferedImage imgSrc = Crypt.loadAndCheckSource(fSrcFile, imgKey.getWidth() / 2, imgKey.getHeight() / 2, true);
        
	// if (imgKey == null) {
    //         JOptionPane.showMessageDialog(null, fKeyFile.getName() + " is not a valid key file", "ERROR", JOptionPane.ERROR_MESSAGE);
    //         return;
	// }
			
	if (imgSrc == null) {
            JOptionPane.showMessageDialog(null, fSrcFile.getName() + " is not fit for encryption", "ERROR", JOptionPane.ERROR_MESSAGE);
	}
        final BufferedImage imgEncr = Crypt.encryptImage(imgKey, imgSrc);
        File outputfile = new File("crypt.png");
        ImageIO.write(imgEncr, "png", outputfile);
        System.out.println("Encrypt");
    }
}
