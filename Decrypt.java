import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.JOptionPane;

public class Decrypt {
    public static void main (String [] args) throws IOException{
        File fKeyFile = new File (args[0]);
        File fEncrFile = new File (args[1]);
        final BufferedImage imgKey = Crypt.loadAndCheckEncrFile(fKeyFile);
        final BufferedImage imgEnc = Crypt.loadAndCheckEncrFile(fEncrFile);
        if (imgKey == null) {
            JOptionPane.showMessageDialog(null, fKeyFile.getName() + " is not a valid key file", "ERROR", JOptionPane.ERROR_MESSAGE);
            return;
	}
			
	if (imgEnc == null) {
            JOptionPane.showMessageDialog(null, fEncrFile.getName() + " is not fit for encryption", "ERROR", JOptionPane.ERROR_MESSAGE);
	}
        final BufferedImage imgOverlay = Crypt.overlayImages(imgKey, imgEnc);
        final BufferedImage imgClean = Crypt.decryptImage(imgOverlay);
        File outputfile = new File("finaloverlap.png");
        ImageIO.write(imgOverlay, "png", outputfile);
        File outputfile1 = new File("clean.png");
        ImageIO.write(imgClean, "png", outputfile1);
    }	
}