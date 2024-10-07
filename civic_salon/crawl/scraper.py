import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
import time
import logging

class UniversalScraper:
    def __init__(self):
        self.setup_logging()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.driver = None

    def setup_logging(self):
        logging.basicConfig(level=logging.INFO,
                           format='%(asctime)s - %(levelname)s - %(message)s')
        self.logger = logging.getLogger(__name__)

    def get_content_static(self, url):
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            self.logger.error(f"靜態請求失敗: {e}")
            return None

    def init_selenium(self):
        if self.driver is None:
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument(f"user-agent={self.headers['User-Agent']}")
            
            self.driver = webdriver.Chrome(
                service=Service(ChromeDriverManager().install()),
                options=chrome_options
            )

    def get_content_dynamic(self, url):
        try:
            self.init_selenium()
            self.driver.get(url)
            
            # 等待頁面加載
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # 檢查是否需要滾動頁面
            last_height = self.driver.execute_script("return document.body.scrollHeight")
            while True:
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)
                new_height = self.driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
            
            return self.driver.page_source
        except Exception as e:
            self.logger.error(f"動態請求失敗: {e}")
            return None
        
    def cleanup(self):
        if self.driver:
            self.driver.quit()
            self.driver = None

    def parse_content(self, html_content):
        if not html_content:
            return None
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # 移除不需要的元素
        for element in soup(['script', 'style', 'nav', 'footer']):
            element.decompose()
        
        return soup

    def get_page_content(self, url, force_dynamic=False):
        content = None
        
        try:
            if not force_dynamic:
                # 首先嘗試靜態請求
                content = self.get_content_static(url)
                
                # 檢查是否獲取到有效內容
                if content:
                    soup = self.parse_content(content)
                    if soup and len(soup.get_text().strip()) > 100:
                        self.logger.info("成功使用靜態請求獲取內容")
                        return self.extract_data(soup)
            
            # 如果靜態請求失敗或強制使用動態請求，則使用Selenium
            self.logger.info("切換到動態請求")
            content = self.get_content_dynamic(url)
            if content:
                soup = self.parse_content(content)
                return self.extract_data(soup)
            
            return None
        
        except Exception as e:
            self.logger.error(f"處理頁面時發生錯誤: {e}")
            return None
        
        finally:
            self.cleanup()

    def extract_data(self, soup):
        if not soup:
            return None
        
        data = {
            'title': None,
            'main_content': None,
            'metadata': {}
        }
        
        # 提取標題
        title_tag = soup.find('h1') or soup.find('title')
        if title_tag:
            data['title'] = title_tag.get_text().strip()
        
        # 提取主要內容
        main_content = []
        content_tags = soup.find_all(['p', 'article', 'div'], class_=['content', 'article', 'post'])
        
        if not content_tags:
            # 如果找不到特定的內容標籤，嘗試提取所有段落
            content_tags = soup.find_all('p')
        
        for tag in content_tags:
            text = tag.get_text().strip()
            if len(text) > 50:  # 假設真正的內容段落通常較長
                main_content.append(text)
        
        data['main_content'] = '\n\n'.join(main_content)
        
        # 提取元數據
        meta_tags = soup.find_all('meta')
        for tag in meta_tags:
            name = tag.get('name', tag.get('property', ''))
            content = tag.get('content', '')
            if name and content:
                data['metadata'][name] = content
        
        return data

# 使用示例
if __name__ == "__main__":
    scraper = UniversalScraper()
    url = "https://example.com"  # 替換為你的目標URL
    
    result = scraper.get_page_content(url)
    if result:
        print(f"標題: {result['title']}")
        print(f"內容預覽: {result['main_content'][:200]}...")
        print(f"元數據: {result['metadata']}")
    else:
        print("無法獲取內容")