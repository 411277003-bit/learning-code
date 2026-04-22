import cv2
import numpy as np
import tkinter as tk
from tkinter import filedialog, Scale, HORIZONTAL, Label
from PIL import Image, ImageTk

class CleanInterfaceEditor:
    def __init__(self, root):
        self.root = root
        self.root.title("雙視窗影像處理器 (簡潔版)")
        self.root.geometry("1200x750")
        self.root.configure(bg="#e0e0e0")

        # --- 核心變數 ---
        self.src_image = None       # 來源圖 (含塗鴉)
        self.final_image = None     # 結果圖 (含濾鏡)
        self.tk_src = None          
        self.tk_res = None          
        
        # 狀態
        self.mode = "BOX"           # 預設為框框模式
        self.brush_color = (0, 0, 0)
        self.filter_type = "None"   
        
        # ROI 框框 (x, y, w, h)
        self.roi = [50, 50, 200, 150]
        self.drag_data = {"x": 0, "y": 0, "item": None}

        # --- 1. 介面佈局 ---
        # 上方: 控制面板
        self.control_panel = tk.Frame(root, height=120, bg="#cccccc")
        self.control_panel.pack(side=tk.TOP, fill=tk.X, padx=5, pady=5)
        
        # 下方: 雙畫布區域
        self.view_frame = tk.Frame(root, bg="#404040")
        self.view_frame.pack(side=tk.BOTTOM, fill=tk.BOTH, expand=True)

        # 左畫布 (來源)
        self.canvas_src = tk.Canvas(self.view_frame, bg="#303030", highlightthickness=0)
        self.canvas_src.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=2)
        
        # 右畫布 (結果)
        self.canvas_res = tk.Canvas(self.view_frame, bg="#303030", highlightthickness=0)
        self.canvas_res.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=2)

        # 綁定滑鼠
        self.canvas_src.bind("<ButtonPress-1>", self.on_mouse_down)
        self.canvas_src.bind("<B1-Motion>", self.on_mouse_drag)
        self.canvas_src.bind("<ButtonRelease-1>", self.on_mouse_up)

        # 標題
        self.canvas_src.create_text(20, 20, text="原圖 / 繪畫區", fill="white", anchor="nw", font=("Microsoft JhengHei", 16, "bold"))
        self.canvas_res.create_text(20, 20, text="結果預覽區", fill="white", anchor="nw", font=("Microsoft JhengHei", 16, "bold"))

        # --- 2. 建立控制項 ---
        self.create_controls()

    def create_controls(self):
        font_style = ("Microsoft JhengHei", 9)
        btn_cfg = {"width": 14, "height": 1, "font": font_style}
        
        # --- A區: 檔案 (移除移動框框按鈕) ---
        frm_a = tk.Frame(self.control_panel, bg="#cccccc")
        frm_a.pack(side=tk.LEFT, padx=10)
        tk.Label(frm_a, text="[ 檔案 ]", bg="#cccccc", font=font_style).pack()
        tk.Button(frm_a, text="開啟圖片", command=self.load_image, bg="#a0c0ff", **btn_cfg).pack(pady=5)
        # 這裡原本的「模式：移動框框」按鈕已經移除了

        # --- B區: 畫筆設定 ---
        frm_b = tk.Frame(self.control_panel, bg="#cccccc")
        frm_b.pack(side=tk.LEFT, padx=10)
        tk.Label(frm_b, text="[ 畫筆工具 ]", bg="#cccccc", font=font_style).pack()
        tk.Button(frm_b, text="黑筆 (Black)", command=lambda: self.set_brush((0,0,0)), **btn_cfg).pack(pady=1)
        tk.Button(frm_b, text="白筆 (White)", command=lambda: self.set_brush((255,255,255)), **btn_cfg).pack(pady=1)
        
        tk.Label(frm_b, text="筆刷粗細:", bg="#cccccc", font=("Microsoft JhengHei", 8)).pack(anchor="w")
        self.val_brush = Scale(frm_b, from_=1, to=30, orient=HORIZONTAL, length=100, bg="#cccccc")
        self.val_brush.set(5)
        self.val_brush.pack()

        # --- C區: 濾鏡選擇 ---
        frm_c = tk.Frame(self.control_panel, bg="#cccccc")
        frm_c.pack(side=tk.LEFT, padx=10)
        tk.Label(frm_c, text="[ 濾鏡選擇 ]", bg="#cccccc", font=font_style).pack()
        self.btn_median = tk.Button(frm_c, text="中值濾波器", command=lambda: self.set_filter("Median"), **btn_cfg)
        self.btn_median.pack(pady=2)
        self.btn_laplace = tk.Button(frm_c, text="拉普拉斯銳利化", command=lambda: self.set_filter("Laplace"), **btn_cfg)
        self.btn_laplace.pack(pady=2)

        # --- D區: 參數調整 ---
        frm_d = tk.Frame(self.control_panel, bg="#cccccc")
        frm_d.pack(side=tk.LEFT, padx=20)
        tk.Label(frm_d, text="[ 參數調整 ]", bg="#cccccc", font=("Microsoft JhengHei", 10, "bold")).pack()
        
        # 中值參數
        tk.Label(frm_d, text="模糊程度 (限奇數):", bg="#cccccc", font=font_style).pack(anchor="w")
        self.val_median = Scale(frm_d, from_=1, to=29, orient=HORIZONTAL, length=150, bg="#cccccc", resolution=2, command=self.on_param_change)
        self.val_median.set(5)
        self.val_median.pack()

        # 拉普拉斯參數
        tk.Label(frm_d, text="銳利化強度:", bg="#cccccc", font=font_style).pack(anchor="w")
        self.val_laplace = Scale(frm_d, from_=0.1, to=3.0, orient=HORIZONTAL, length=150, bg="#cccccc", resolution=0.1, command=self.on_param_change)
        self.val_laplace.set(1.0)
        self.val_laplace.pack()

    # --- 功能實作 ---

    def load_image(self):
        path = filedialog.askopenfilename(filetypes=[("Images", "*.jpg *.png *.bmp")])
        if not path: return
        
        img = cv2.imread(path)
        h, w = img.shape[:2]
        max_w = 550 
        max_h = 550
        scale = min(max_w/w, max_h/h)
        if scale < 1:
            img = cv2.resize(img, (int(w*scale), int(h*scale)))
            
        self.src_image = img.copy()
        self.final_image = img.copy()
        self.set_mode("BOX") # 載入圖片時，預設為移動框框模式
        self.process_filter() 

    def set_mode(self, mode):
        self.mode = mode
        cursor = "arrow" if mode == "BOX" else "crosshair"
        self.canvas_src.config(cursor=cursor)

    def set_brush(self, color):
        self.brush_color = color
        self.set_mode("PAINT")

    def set_filter(self, f_type):
        self.filter_type = f_type
        # 更新按鈕顏色
        self.btn_median.config(bg="#aaccff" if f_type == "Median" else "#f0f0f0")
        self.btn_laplace.config(bg="#aaccff" if f_type == "Laplace" else "#f0f0f0")
        
        # 關鍵修改：點擊濾鏡時，自動切換回框框模式，方便使用者調整位置
        self.set_mode("BOX") 
        
        self.process_filter()

    def on_param_change(self, val):
        self.process_filter()

    def process_filter(self):
        if self.src_image is None: return
        
        self.final_image = self.src_image.copy()
        
        x, y, w, h = self.roi
        ih, iw = self.src_image.shape[:2]
        
        x, y = max(0, int(x)), max(0, int(y))
        w = min(int(w), iw - x)
        h = min(int(h), ih - y)
        
        if w <= 0 or h <= 0: 
            self.update_displays()
            return

        roi_img = self.final_image[y:y+h, x:x+w]
        
        try:
            if self.filter_type == "Median":
                k = int(self.val_median.get())
                if k % 2 == 0: k += 1 
                roi_img = cv2.medianBlur(roi_img, k)
                
            elif self.filter_type == "Laplace":
                strength = self.val_laplace.get()
                gray = cv2.cvtColor(roi_img, cv2.COLOR_BGR2GRAY)
                lap = cv2.Laplacian(gray, cv2.CV_64F)
                lap = cv2.convertScaleAbs(lap)
                lap_color = cv2.cvtColor(lap, cv2.COLOR_GRAY2BGR)
                roi_img = cv2.addWeighted(roi_img, 1.0, lap_color, strength, 0)

            self.final_image[y:y+h, x:x+w] = roi_img
            
        except Exception as e:
            print("Filter Error:", e)

        self.update_displays()

    def update_displays(self):
        if self.src_image is None: return

        # 左側
        src_rgb = cv2.cvtColor(self.src_image, cv2.COLOR_BGR2RGB)
        self.tk_src = ImageTk.PhotoImage(Image.fromarray(src_rgb))
        self.canvas_src.delete("img")
        self.canvas_src.create_image(0, 0, image=self.tk_src, anchor=tk.NW, tags="img")
        self.canvas_src.tag_lower("img")
        self.draw_roi(self.canvas_src)

        # 右側
        res_rgb = cv2.cvtColor(self.final_image, cv2.COLOR_BGR2RGB)
        self.tk_res = ImageTk.PhotoImage(Image.fromarray(res_rgb))
        self.canvas_res.delete("all") 
        self.canvas_res.create_image(0, 0, image=self.tk_res, anchor=tk.NW, tags="img")

    def draw_roi(self, canvas):
        canvas.delete("roi", "handle")
        x, y, w, h = self.roi
        canvas.create_rectangle(x, y, x+w, y+h, outline="#00ff00", width=2, tags="roi")
        canvas.create_oval(x+w-5, y+h-5, x+w+5, y+h+5, fill="yellow", tags="handle")

    # --- 滑鼠事件 ---
    def on_mouse_down(self, event):
        if self.mode == "BOX":
            hx1, hy1, hx2, hy2 = self.canvas_src.bbox("handle")
            if hx1 <= event.x <= hx2 and hy1 <= event.y <= hy2:
                self.drag_data["item"] = "handle"
                self.drag_data["x"] = event.x; self.drag_data["y"] = event.y
                return
            rx1, ry1, rx2, ry2 = self.canvas_src.bbox("roi")
            if rx1 <= event.x <= rx2 and ry1 <= event.y <= ry2:
                self.drag_data["item"] = "roi"
                self.drag_data["x"] = event.x; self.drag_data["y"] = event.y
                return
        
        elif self.mode == "PAINT":
            self.paint(event.x, event.y)

    def on_mouse_drag(self, event):
        if self.mode == "BOX" and self.drag_data["item"]:
            dx = event.x - self.drag_data["x"]
            dy = event.y - self.drag_data["y"]
            
            if self.drag_data["item"] == "roi":
                self.roi[0] += dx
                self.roi[1] += dy
            elif self.drag_data["item"] == "handle":
                self.roi[2] = max(20, self.roi[2] + dx)
                self.roi[3] = max(20, self.roi[3] + dy)
                
            self.drag_data["x"] = event.x
            self.drag_data["y"] = event.y
            self.process_filter() 

        elif self.mode == "PAINT":
            self.paint(event.x, event.y)

    def on_mouse_up(self, event):
        self.drag_data["item"] = None
        self.process_filter()

    def paint(self, x, y):
        if self.src_image is None: return
        r = int(self.val_brush.get())
        cv2.circle(self.src_image, (x, y), r, self.brush_color, -1)
        self.process_filter()

if __name__ == "__main__":
    root = tk.Tk()
    app = CleanInterfaceEditor(root)
    root.mainloop()